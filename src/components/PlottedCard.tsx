import clsx from "clsx";
import Link from "next/link";
import { Avatar } from "components/Avatar";
import { formatAddress } from "lib/formatAddress";
import { formatTime } from "lib/formatTime";
import RichTextRenderer from "components/RichTextRenderer";
import IconButton from "components/IconButton";
import {
  IconNotUseful,
  IconIntelligence,
  IconOutlineNotUseful,
  IconOutlineUseful,
  IconUseful,
} from "custom-icons";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleBottomCenter,
} from "react-icons/hi2";
import { formatNumber } from "lib/formatNumber";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { usePlotModal } from "state/plotModal";
import { useAuthStore } from "state/auth";
import PlotDropdownMenu from "components/PlotDropdownMenu";
import MediaRenderer from "components/MediaRenderer";
import CardContainer from "components/CardContainer";
import { useFeedback } from "hooks/useFeedback";
import { useCallback } from "react";
import { useWithAuth } from "hooks/useWithAuth";

export default function PlottedCard({
  nodeItem,
  pageIndex,
  queryKey,
}: {
  nodeItem: any;
  pageIndex?: number;
  queryKey: any[];
}) {
  const router = useRouter();
  const { withAuthHandler } = useWithAuth();

  const { account } = useAuthStore();
  const { openPlotModal } = usePlotModal();

  const isReplottedPlot = !_.isEmpty(nodeItem.node.parent_post);
  const node = isReplottedPlot ? nodeItem.node.parent_post : nodeItem.node;
  const plotId = isReplottedPlot ? nodeItem.node.parent_pid : nodeItem.node.id;

  const isOwnerPlot =
    account?.toLowerCase() === node.profile.public_address.toLowerCase();
  const isReplotted = node.feedback.user_replot_status !== null;
  const replotId = isReplotted ? node.feedback.user_replot_id : node.id;

  const profileLink = node.profile?.handle
    ? `/${node.profile?.handle}`
    : `/${node.profile.public_address}`;
  const shortedAddress = formatAddress(node.profile.public_address);
  const username =
    node.profile?.handle ??
    formatAddress(node.profile?.public_address, { trailing: 0 });

  const ownerReplottedName =
    nodeItem.node.profile?.handle ??
    formatAddress(nodeItem.node.profile?.public_address, {
      trailing: 0,
    });

  const { feedback, replot } = useFeedback(queryKey);

  const onUseful = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) => {
        feedback &&
          feedback({
            plotId: plotId,
            feedback: isActive ? "DELETE" : "USEFUL",
            pageIndex,
          });
      },
      [feedback, pageIndex]
    )
  );

  const onNotUseful = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) =>
        feedback &&
        feedback({
          plotId: plotId,
          feedback: isActive ? "DELETE" : "NOT_USEFUL",
          pageIndex,
        }),
      [feedback, pageIndex]
    )
  );

  const onReplot = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) =>
        replot &&
        replot({
          plotId: plotId,
          isReplot: !isActive,
          pageIndex,
        }),
      [replot, pageIndex]
    )
  );

  const onOpenPlotModal = withAuthHandler(
    useCallback(
      () =>
        openPlotModal({
          to: username,
          plotDetails: {
            plotId,
            avatarUrl: node.profile?.profile_picture_uri,
            desc: shortedAddress,
            timestamp: formatTime(Number(node.created_at)),
            content: node.content,
          },
        }),
      [username, plotId, node, openPlotModal, shortedAddress]
    )
  );

  return (
    <CardContainer onClick={() => router.push(`/plot/${plotId}`)}>
      {isReplottedPlot && (
        <div className="flex items-center gap-3 text-secondary-text h-7">
          <div className="flex justify-end w-10">
            <HiOutlineArrowPathRoundedSquare size={16} />
          </div>
          <div className="flex items-center text-xs font-semibold">
            {`${isOwnerPlot ? "You" : ownerReplottedName} Replotted`}
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <Link
          href={profileLink}
          className="hover:brightness-90"
          onClick={(e) => e.stopPropagation()}
        >
          <Avatar address={node.profile?.profile_picture_uri} size={40} />
        </Link>
        <div className="flex flex-col w-[calc(100%-40px-12px)]">
          <div className="flex items-center justify-between">
            <div className="flex gap-[6px] w-full items-end">
              <Link
                href={profileLink}
                className="font-semibold hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {username}
              </Link>
              <div className="text-secondary-text">{shortedAddress}</div>
              <div className="text-secondary-text">·</div>
              <div className="text-secondary-text">
                {formatTime(Number(node.created_at))}
              </div>
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

          {node.source === "on-chain" && (
            <div className="text-secondary-text flex gap-[6px] items-center h-[1.375rem] m-[2px]">
              <IconIntelligence size={16} />
              <span>On-chain as a Plot</span>
            </div>
          )}

          <div className="w-full mb-3 break-words">
            <RichTextRenderer content={node.content} />
            {node?.media && <MediaRenderer media={node.media} />}
          </div>

          <div className="flex items-center justify-between w-full cursor-pointer sm:w-3/4 text-secondary-text">
            <div className="flex items-center">
              <IconButton
                icon={
                  node.feedback.user_feedback_status === 1 ? (
                    <IconUseful size={20} color="text-green-500" />
                  ) : (
                    <IconOutlineUseful size={20} />
                  )
                }
                activeColor="green"
                label={formatNumber(node.feedback.useful)}
                onClick={() =>
                  onUseful(plotId, node.feedback.user_feedback_status === 1)
                }
              />
              <div className="pr-2 text-xs">·</div>
              <IconButton
                icon={
                  node.feedback.user_feedback_status === 0 ? (
                    <IconNotUseful size={20} color="text-red-500" />
                  ) : (
                    <IconOutlineNotUseful size={20} />
                  )
                }
                activeColor="red"
                label="Not useful"
                onClick={() =>
                  onNotUseful(plotId, node.feedback.user_feedback_status === 0)
                }
              />
            </div>
            <IconButton
              icon={
                <HiOutlineArrowPathRoundedSquare
                  size={20}
                  className={clsx(isReplotted && "text-blue-500")}
                />
              }
              activeColor="blue"
              label={formatNumber(node.feedback.total_replot)}
              onClick={() => onReplot(replotId, isReplotted)}
            />
            <IconButton
              icon={<HiOutlineChatBubbleBottomCenter size={20} />}
              activeColor="green"
              label={formatNumber(node.feedback.total_reply)}
              onClick={onOpenPlotModal}
            />
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
