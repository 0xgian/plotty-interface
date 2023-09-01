import clsx from "clsx";
import RichTextRenderer from "components/RichTextRenderer";
import _ from "lodash";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleBottomCenter,
} from "react-icons/hi2";
import {
  IconNotUseful,
  IconIntelligence,
  IconOutlineNotUseful,
  IconOutlineUseful,
  IconUseful,
} from "custom-icons";
import Link from "next/link";
import { Avatar } from "components/Avatar";
import { formatAddress } from "lib/formatAddress";
import moment from "moment";
import { formatNumber } from "lib/formatNumber";
import IconButton from "components/IconButton";
import { usePlotModal } from "state/plotModal";
import { formatTime } from "lib/formatTime";
import PlotCard from "components/PlotCard";
import Button from "components/Button";
import PlotDropdownMenu from "components/PlotDropdownMenu";
import { useAuthStore } from "state/auth";
import MediaRenderer from "components/MediaRenderer";
import { useCallback } from "react";
import { useFeedback } from "hooks/useFeedback";
import { useWithAuth } from "hooks/useWithAuth";

export default function PlottedCardFocused({
  queryKey,
  plotDetails,
}: {
  queryKey: any[];
  plotDetails: any;
}) {
  const { withAuthHandler } = useWithAuth();

  const { account } = useAuthStore();
  const { openPlotModal } = usePlotModal();

  const isOwnerPlot =
    account?.toLowerCase() ===
    plotDetails?.profile?.public_address.toLowerCase();

  const plotId = plotDetails.id;
  const isReplotted = plotDetails?.feedback.user_replot_status !== null;
  const replotId = isReplotted ? plotDetails?.feedback.user_replot_id : plotId;

  const profileLink = plotDetails?.profile?.handle
    ? `/${plotDetails?.profile?.handle}`
    : `/${plotDetails?.profile.public_address}`;
  const shortedAddress =
    plotDetails && formatAddress(plotDetails?.profile?.public_address);
  const username =
    plotDetails &&
    (plotDetails?.profile?.handle ??
      formatAddress(plotDetails?.profile?.public_address, { trailing: 0 }));

  const { feedback, replot } = useFeedback(queryKey);

  const onUseful = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) => {
        feedback &&
          feedback({
            plotId: plotId,
            feedback: isActive ? "DELETE" : "USEFUL",
          });
      },
      [feedback]
    )
  );

  const onNotUseful = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) =>
        feedback &&
        feedback({
          plotId: plotId,
          feedback: isActive ? "DELETE" : "NOT_USEFUL",
        }),
      [feedback]
    )
  );

  const onReplot = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) =>
        replot &&
        replot({
          plotId: plotId,
          isReplot: !isActive,
        }),
      [replot]
    )
  );

  const onOpenPlotModal = withAuthHandler(
    useCallback(
      () =>
        openPlotModal({
          to: username,
          plotDetails: {
            plotId,
            avatarUrl: plotDetails.profile?.profile_picture_uri,
            desc: shortedAddress,
            timestamp: formatTime(Number(plotDetails.created_at)),
            content: plotDetails.content,
          },
        }),
      [username, plotId, plotDetails, shortedAddress, openPlotModal]
    )
  );

  return (
    <div
      className={clsx(
        "sm:max-w-[600px] pb-3 px-4",
        "border-b border-secondary-text border-opacity-10"
      )}
    >
      {isReplotted && (
        <div className="flex items-center gap-3 text-secondary-text h-7">
          <div className="flex justify-end w-10">
            <HiOutlineArrowPathRoundedSquare size={16} />
          </div>
          <div className="flex items-center text-xs font-semibold">
            You Replotted
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <Link href={profileLink} className="hover:brightness-90">
          <Avatar
            address={plotDetails.profile?.profile_picture_uri}
            size={40}
          />
        </Link>
        <div className="flex flex-col w-[calc(100%-40px-12px)]">
          <div className="flex items-center justify-between">
            <div className="flex gap-[6px] w-full items-end">
              <Link
                href={profileLink}
                className="font-semibold hover:underline"
              >
                {username}
              </Link>
            </div>

            {isOwnerPlot && (
              <PlotDropdownMenu
                onClickMenu={(key: string) => {
                  switch (key) {
                    case "DELETE":
                      onReplot(plotId, true);
                      break;

                    default:
                      break;
                  }
                }}
              />
            )}
          </div>

          <div className="flex gap-[6px] w-full items-end">
            <div className="text-secondary-text">{shortedAddress}</div>
          </div>
          {plotDetails.source === "on-chain" && (
            <div className="text-secondary-text flex gap-[6px] items-center m-[2px]">
              <IconIntelligence size={16} />
              <span>On-chain as a Plot</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-3 break-words">
        <RichTextRenderer content={plotDetails.content} />
        {plotDetails?.media && <MediaRenderer media={plotDetails.media} />}
      </div>

      <div className="mt-3" />

      <div className="flex flex-col-reverse w-full gap-3 mt-3 sm:flex-row sm:justify-between">
        {Number(
          plotDetails.feedback.useful |
            plotDetails.feedback.total_replot |
            plotDetails.feedback.total_reply
        ) > 0 && (
          <div className="flex gap-3">
            {Number(plotDetails.feedback.useful) > 0 && (
              <div className="flex gap-[6px]">
                <span className="font-semibold">
                  {formatNumber(plotDetails.feedback.useful)}
                </span>
                <span className="text-secondary-text">Useful</span>
              </div>
            )}
            {Number(plotDetails.feedback.total_replot) > 0 && (
              <div className="flex gap-[6px]">
                <span className="font-semibold">
                  {formatNumber(plotDetails.feedback.total_replot)}
                </span>
                <span className="text-secondary-text">Replots</span>
              </div>
            )}
            {Number(plotDetails.feedback.total_reply) > 0 && (
              <div className="flex gap-[6px]">
                <span className="font-semibold">
                  {formatNumber(plotDetails.feedback.total_reply)}
                </span>
                <span className="text-secondary-text">Replies</span>
              </div>
            )}
          </div>
        )}

        <div className="text-secondary-text">
          {moment(Number(plotDetails.created_at)).format(
            "h:mm A · MMM D, YYYY"
          )}
        </div>
      </div>

      <div
        className={clsx(
          "flex justify-around w-full gap-3 py-3 mt-3 text-secondary-text",
          "border-y border-secondary-text border-opacity-10"
        )}
      >
        <IconButton
          icon={
            plotDetails.feedback.user_feedback_status === 1 ? (
              <IconUseful size={22} color="text-green-500" />
            ) : (
              <IconOutlineUseful size={22} />
            )
          }
          size="2xl"
          activeColor="green"
          onClick={() =>
            onUseful(plotId, plotDetails.feedback.user_feedback_status === 1)
          }
        />
        <IconButton
          icon={
            plotDetails.feedback.user_feedback_status === 0 ? (
              <IconNotUseful size={22} color="text-red-500" />
            ) : (
              <IconOutlineNotUseful size={22} />
            )
          }
          size="2xl"
          activeColor="red"
          onClick={() =>
            onNotUseful(plotId, plotDetails.feedback.user_feedback_status === 0)
          }
        />
        <IconButton
          icon={
            <HiOutlineArrowPathRoundedSquare
              size={22}
              className={clsx(isReplotted && "text-blue-500")}
            />
          }
          size="2xl"
          activeColor="blue"
          onClick={() => onReplot(replotId, isReplotted)}
        />
        <IconButton
          icon={<HiOutlineChatBubbleBottomCenter size={22} />}
          size="2xl"
          activeColor="green"
          onClick={onOpenPlotModal}
        />
      </div>

      {!!account ? (
        <PlotCard
          minHeight="min-h-[28px]"
          placeHolder="Plot your reply!"
          maxHeight="max-h-auto"
          pr=""
        >
          {({ editor, plot, parsedContent, tools }) => {
            const isNotEmpty = parsedContent.weightedLength > 0;
            return (
              <div
                className={clsx(
                  "flex transition-all",
                  isNotEmpty && "flex-col"
                )}
              >
                <div
                  className={clsx(
                    isNotEmpty ? "w-full" : "w-[calc(100%-73px-12px)]"
                  )}
                >
                  {editor}
                </div>

                <div
                  className={clsx(
                    isNotEmpty
                      ? "flex justify-between w-full pl-[calc(40px+12px)]"
                      : "mt-4 ml-3"
                  )}
                >
                  {isNotEmpty && tools}

                  <Button
                    size="sm"
                    onClick={() => plot(plotId)}
                    disabled={!parsedContent.valid}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            );
          }}
        </PlotCard>
      ) : (
        <div className="h-[28px]" />
      )}
    </div>
  );
}
