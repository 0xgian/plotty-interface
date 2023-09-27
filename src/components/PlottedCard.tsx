import clsx from "clsx";
import Link from "next/link";
import { Avatar } from "components/Avatar";
import { formatAddress, formatWithBrackets } from "lib/formatAddress";
import { formatTime } from "lib/formatTime";
import RichTextRenderer from "components/RichTextRenderer";
import IconButton from "components/IconButton";
import {
  IconNotUseful,
  IconIntelligence,
  IconOutlineNotUseful,
  IconOutlineUseful,
  IconUseful,
  IconHandleBadge,
} from "custom-icons";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleBottomCenter,
} from "react-icons/hi2";
import { formatNumber } from "lib/formatNumber";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { usePlotModal } from "state/plotModal";
import { useAuthStore } from "state/auth";
import PlotDropdownMenu from "components/PlotDropdownMenu";
import MediaRenderer from "components/MediaRenderer";
import CardContainer from "components/CardContainer";
import { useFeedback } from "hooks/useFeedback";
import { Fragment, useCallback, useMemo } from "react";
import { useWithAuth } from "hooks/useWithAuth";
import { usePlotFeedbackStore } from "state/plotFeedback";
import { usePrivateLabels } from "state/privateLabels";

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
  const params = useParams();
  const u = params?.["u"] as string;
  const { withAuthHandler } = useWithAuth();

  const { account } = useAuthStore();
  const { openPlotModal } = usePlotModal();

  const {
    useful,
    isUseful,
    isNotUseful,
    isReplotted,
    totalReplots,
    toggleUseful,
    toggleNotUseful,
    toggleReplot,
  } = usePlotFeedbackStore();

  const isReplottedPlot = !_.isEmpty(nodeItem.node.parent_post);
  const node = isReplottedPlot ? nodeItem.node.parent_post : nodeItem.node;
  const plotId = isReplottedPlot ? nodeItem.node.parent_pid : nodeItem.node.id;

  const isOwnerPlot =
    account?.toLowerCase() === node.profile.public_address.toLowerCase();
  const replotId = isReplotted(plotId) ? node.feedback.user_replot_id : node.id;

  const profileLink = node.profile?.handle
    ? `/${node.profile?.handle}`
    : `/${node.profile.public_address}`;

  const { labelByUid } = usePrivateLabels();
  const privLabel = labelByUid(node.profile?.uid);
  const nametag =
    privLabel ||
    node.profile?.public_nametag_user_preferance ||
    node.profile?.public_nametag;

  const shortedAddress = formatAddress(node.profile.public_address);
  const subtitleEntity = useMemo(
    () => [shortedAddress, formatTime(Number(node.created_at))],
    [shortedAddress, node.created_at]
  );

  const username = node.profile?.handle
    ? node.profile.handle + formatWithBrackets(nametag)
    : nametag || formatAddress(node.profile?.public_address, { trailing: 0 });
  const usernameBadge = useMemo(
    () =>
      node.profile?.handle ? (
        <IconHandleBadge size={15} className="text-primary" />
      ) : null,
    [node]
  );

  const ownerReplottedName =
    nodeItem.node.profile?.handle ??
    formatAddress(nodeItem.node.profile?.public_address, {
      trailing: 0,
    });

  const { feedback, replot } = useFeedback();

  const onUseful = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) => {
        toggleUseful(plotId);
        feedback &&
          feedback({
            plotId: plotId,
            feedback: isActive ? "DELETE" : "USEFUL",
            pageIndex,
            queryKey,
          });
      },
      [toggleUseful, feedback, pageIndex, queryKey]
    )
  );

  const onNotUseful = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) => {
        toggleNotUseful(plotId);
        feedback &&
          feedback({
            plotId: plotId,
            feedback: isActive ? "DELETE" : "NOT_USEFUL",
            pageIndex,
            queryKey,
          });
      },
      [toggleNotUseful, feedback, pageIndex, queryKey]
    )
  );

  const onReplot = withAuthHandler(
    useCallback(
      (replotId: string, isActive: boolean) => {
        toggleReplot(plotId);
        replot &&
          replot({
            plotId: replotId,
            isReplot: !isActive,
            pageIndex,
            queryKey,
          });
      },
      [toggleReplot, plotId, replot, pageIndex, queryKey]
    )
  );

  const onDelete = withAuthHandler(
    useCallback(
      (plotId: string) =>
        replot &&
        replot({
          plotId: plotId,
          isReplot: false,
          pageIndex,
          queryKey,
        }),
      [replot, pageIndex, queryKey]
    )
  );

  const onOpenPlotModal = withAuthHandler(
    useCallback(
      () =>
        openPlotModal({
          to: username,
          plotDetails: {
            plotId,
            avatarUrl:
              node.profile?.profile_picture_uri ?? node.profile?.public_address,
            badge: usernameBadge,
            subtitleEntity,
            content: node.content,
          },
        }),
      [username, plotId, node, openPlotModal, usernameBadge, subtitleEntity]
    )
  );

  return (
    <CardContainer onClick={() => router.push(`/plot/${plotId}`)}>
      {isReplottedPlot && (
        <div className="flex items-center gap-3 text-secondary-text h-7">
          <div className="flex justify-end w-10">
            <HiOutlineArrowPathRoundedSquare size={15} />
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
          <Avatar
            address={
              node.profile?.profile_picture_uri ??
              `avatar:${node.profile?.public_address}`
            }
            size={40}
          />
        </Link>
        <div className="flex flex-col w-[calc(100%-40px-12px)]">
          <div className="flex items-center justify-between">
            <div className="flex gap-[6px] w-full items-center">
              <Link
                href={profileLink}
                className="font-semibold truncate hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {username}
              </Link>
              {usernameBadge}
              {subtitleEntity
                .filter((text) => !!text)
                .map((text, i) => (
                  <Fragment key={text}>
                    {i > 0 && <div className="text-secondary-text">·</div>}
                    <div
                      className={clsx(
                        "text-secondary-text whitespace-nowrap",
                        text.length > 6 && "truncate"
                      )}
                    >
                      {text}
                    </div>
                  </Fragment>
                ))}
            </div>

            <PlotDropdownMenu
              isOwnerPlot={isOwnerPlot}
              profile={node.profile}
              queryKey={["profile", u, true]}
              onClickMenu={(key: string) => {
                switch (key) {
                  case "DELETE":
                    onDelete(plotId);
                    break;

                  default:
                    break;
                }
              }}
            />
          </div>

          {node.source === "on-chain" && (
            <div className="text-secondary-text flex gap-[6px] items-center h-[1.375rem] m-[2px]">
              <IconIntelligence size={15} />
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
                  isUseful(plotId) ? (
                    <IconUseful size={20} color="text-green-500" />
                  ) : (
                    <IconOutlineUseful size={20} />
                  )
                }
                activeColor="green"
                activeAnimate
                label={formatNumber(useful(plotId))}
                labelAnimate
                onClick={() => onUseful(plotId, isUseful(plotId))}
              />
              <div className="pr-2 text-xs">·</div>
              <IconButton
                icon={
                  isNotUseful(plotId) ? (
                    <IconNotUseful size={20} color="text-red-500" />
                  ) : (
                    <IconOutlineNotUseful size={20} />
                  )
                }
                activeColor="red"
                activeAnimate
                onClick={() => onNotUseful(plotId, isNotUseful(plotId))}
              />
            </div>
            <IconButton
              icon={
                <HiOutlineArrowPathRoundedSquare
                  size={20}
                  className={clsx(isReplotted(plotId) && "text-blue-500")}
                />
              }
              activeColor="blue"
              label={formatNumber(totalReplots(plotId))}
              labelAnimate
              onClick={() => onReplot(replotId, isReplotted(plotId))}
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
