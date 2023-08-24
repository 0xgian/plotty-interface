import { usePlot } from "hooks/usePlot";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { Avatar } from "components/Avatar";
import { useAuthStatusStore } from "state/authStatus";
import clsx from "clsx";
import RichTextEditor from "components/RichTextEditor";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import IconButton from "components/IconButton";
import { HiOutlineEmojiHappy, HiOutlinePhotograph } from "react-icons/hi";
import RadialProgress from "components/RadialProgress";
import textProcessor from "lib/textProcessor";

export default function PlotCard({
  maxHeight = "max-h-[62dvh]",
  pr = "pr-4 sm:pr-6",
  placeHolder,
  minHeight = "min-h-[92px]",
  onSuccess = () => {},
  children,
}: {
  maxHeight?: string;
  pr?: string;
  placeHolder?: string;
  minHeight?: string;
  onSuccess?: () => void;
  children: (renderProps: {
    editor: ReactNode;
    plot: (plotId?: string) => void;
    parsedContent: textProcessor.ParsedTweet;
    tools: ReactNode;
  }) => ReactNode;
}) {
  const ref = useRef();
  const router = useRouter();
  const pathname = usePathname() as string;

  const { account } = useAuthStatusStore();
  const { plot: post, invalidatePlot } = usePlot();
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const parsedContent = useMemo(
    () => textProcessor.parseTweet(content),
    [content]
  );

  const plot = useCallback(
    async (plotId?: string) => {
      if (post && parsedContent.valid)
        try {
          const resPlotId = await post({
            content,
            plotId,
            images,
          });
          onSuccess();
          const callbackPlotId = plotId ?? resPlotId;
          if (pathname === `/plot/${callbackPlotId}`) {
            invalidatePlot(callbackPlotId);
            (ref?.current as any)?.clearData();
            return;
          }
          router.push(`/plot/${callbackPlotId}`);
        } catch (error) {
          toast("Failed to plot. Please try again later.");
        }
    },
    [
      post,
      invalidatePlot,
      router,
      pathname,
      content,
      onSuccess,
      parsedContent.valid,
      images,
    ]
  );

  const selectImages = useCallback(
    () => ref?.current && (ref.current as any)?.insertImages(),
    []
  );

  const toggleEmojiPicker = useCallback(
    () => ref?.current && (ref.current as any)?.toggleEmojiPicker(),
    []
  );

  return (
    <>
      {children({
        editor: (
          <div
            className={clsx(
              "flex items-start gap-3 py-3 overflow-y-auto",
              maxHeight,
              pr
            )}
          >
            {account && <Avatar address={account} size={40} />}
            <div
              className={clsx(
                "w-[calc(100%-40px-12px)] mt-[6px] mb-3 leading-snug break-words",
                "flex flex-col text-xl",
                minHeight
              )}
            >
              <RichTextEditor
                parentRef={ref}
                onChangeText={setContent}
                onChangeImages={setImages}
                placeholder={placeHolder}
              />
            </div>
          </div>
        ),
        plot,
        parsedContent,
        tools: (
          <div className="flex items-center w-full gap-3 text-secondary-text">
            <IconButton
              icon={<HiOutlinePhotograph size={20} />}
              activeColor="black"
              onClick={selectImages}
            />
            <IconButton
              id="toggle-emoji-picker"
              className="relative"
              icon={<HiOutlineEmojiHappy size={20} />}
              activeColor="black"
              onClick={toggleEmojiPicker}
            />

            {content.length > 0 && (
              <RadialProgress fraction={[parsedContent.weightedLength, 280]} />
            )}
          </div>
        ),
      })}
    </>
  );
}
