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
  IconHandleBadge,
} from "custom-icons";
import Link from "next/link";
import { Avatar } from "components/Avatar";
import { formatAddress, formatWithBrackets } from "lib/formatAddress";
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
import { Fragment, useCallback, useMemo } from "react";
import { useFeedback } from "hooks/useFeedback";
import { useWithAuth } from "hooks/useWithAuth";
import { usePlotFeedbackStore } from "state/plotFeedback";

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

  const isOwnerPlot =
    account?.toLowerCase() ===
    plotDetails?.profile?.public_address.toLowerCase();

  const plotId = plotDetails.id;
  const replotId = isReplotted(plotId)
    ? plotDetails?.feedback.user_replot_id
    : plotId;

  const profileLink = plotDetails?.profile?.handle
    ? `/${plotDetails?.profile?.handle}`
    : `/${plotDetails?.profile.public_address}`;

  const nametag =
    plotDetails?.profile?.public_nametag_user_preferance ||
    plotDetails?.profile?.public_nametag;

  const shortedAddress =
    plotDetails && formatAddress(plotDetails?.profile?.public_address);
  const subtitleEntity = useMemo(() => [shortedAddress], [shortedAddress]);

  const username = plotDetails?.profile?.handle
    ? plotDetails.profile.handle + formatWithBrackets(nametag)
    : nametag ||
      formatAddress(plotDetails.profile?.public_address, { trailing: 0 });
  const usernameBadge = useMemo(
    () =>
      plotDetails?.profile?.handle ? (
        <IconHandleBadge size={15} className="text-primary" />
      ) : null,
    [plotDetails]
  );

  const { feedback, replot } = useFeedback(queryKey);

  const onUseful = withAuthHandler(
    useCallback(
      (plotId: string, isActive: boolean) => {
        toggleUseful(plotId);
        feedback &&
          feedback({
            plotId: plotId,
            feedback: isActive ? "DELETE" : "USEFUL",
          });
      },
      [toggleUseful, feedback]
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
          });
      },
      [toggleNotUseful, feedback]
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
          });
      },
      [toggleReplot, plotId, replot]
    )
  );

  const onDelete = withAuthHandler(
    useCallback(
      (plotId: string) =>
        replot &&
        replot({
          plotId: plotId,
          isReplot: false,
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
            avatarUrl:
              plotDetails.profile?.profile_picture_uri ??
              `avatar:${plotDetails.profile?.public_address}`,
            badge: usernameBadge,
            subtitleEntity: [
              ...subtitleEntity,
              formatTime(Number(plotDetails.created_at)),
            ],
            content: plotDetails.content,
          },
        }),
      [
        username,
        plotId,
        plotDetails,
        usernameBadge,
        subtitleEntity,
        openPlotModal,
      ]
    )
  );

  return (
    <div
      className={clsx(
        "sm:max-w-[600px] pb-3 px-4",
        "border-b border-secondary-text border-opacity-10"
      )}
    >
      {isReplotted(plotId) && (
        <div className="flex items-center gap-3 text-secondary-text h-7">
          <div className="flex justify-end w-10">
            <HiOutlineArrowPathRoundedSquare size={15} />
          </div>
          <div className="flex items-center text-xs font-semibold">
            You Replotted
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <Link href={profileLink} className="hover:brightness-90">
          <Avatar
            address={
              plotDetails.profile?.profile_picture_uri ??
              `avatar:${plotDetails.profile?.public_address}`
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
              >
                {username}
              </Link>
              {usernameBadge}
            </div>

            {isOwnerPlot && (
              <PlotDropdownMenu
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
            )}
          </div>

          <div className="flex gap-[6px] w-full items-end">
            {subtitleEntity
              .filter((text) => !!text)
              .map((text, i) => (
                <Fragment key={text}>
                  {i > 0 && <div className="text-secondary-text">·</div>}
                  <div className="text-secondary-text">{text}</div>
                </Fragment>
              ))}
          </div>
          {plotDetails.source === "on-chain" && (
            <div className="text-secondary-text flex gap-[6px] items-center m-[2px]">
              <IconIntelligence size={15} />
              <span className="truncate">On-chain as a Plot</span>
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
          useful(plotId) |
            totalReplots(plotId) |
            plotDetails.feedback.total_reply
        ) > 0 && (
          <div className="flex gap-3">
            {Number(useful(plotId)) > 0 && (
              <div className="flex gap-[6px]">
                <span className="font-semibold">
                  {formatNumber(useful(plotId))}
                </span>
                <span className="text-secondary-text">Useful</span>
              </div>
            )}
            {Number(totalReplots(plotId)) > 0 && (
              <div className="flex gap-[6px]">
                <span className="font-semibold">
                  {formatNumber(totalReplots(plotId))}
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
            isUseful(plotId) ? (
              <IconUseful size={22} color="text-green-500" />
            ) : (
              <IconOutlineUseful size={22} />
            )
          }
          size="2xl"
          activeColor="green"
          activeAnimate
          onClick={() => onUseful(plotId, isUseful(plotId))}
        />
        <IconButton
          icon={
            isNotUseful(plotId) ? (
              <IconNotUseful size={22} color="text-red-500" />
            ) : (
              <IconOutlineNotUseful size={22} />
            )
          }
          size="2xl"
          activeColor="red"
          activeAnimate
          onClick={() => onNotUseful(plotId, isNotUseful(plotId))}
        />
        <IconButton
          icon={
            <HiOutlineArrowPathRoundedSquare
              size={22}
              className={clsx(isReplotted(plotId) && "text-blue-500")}
            />
          }
          size="2xl"
          activeColor="blue"
          onClick={() => onReplot(replotId, isReplotted(plotId))}
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
