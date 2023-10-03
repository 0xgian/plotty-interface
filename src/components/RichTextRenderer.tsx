import textProcessor from "lib/textProcessor";
import { formatAddress, formatUrl } from "lib/formatAddress";
import Link from "next/link";
import clsx from "clsx";
import { isAddress } from "viem";

export default function RichTextRenderer({
  content,
  viewOnly = false,
}: {
  content: string;
  viewOnly?: boolean;
}) {
  const lines = content.split(/\r\n|\n|\r/);
  return (
    <>
      {lines.map((line, i) => {
        const entities: any = textProcessor.extractEntitiesWithIndices(line);
        let beginIndex = 0;
        entities.sort(function (a: any, b: any) {
          return a.indices[0] - b.indices[0];
        });

        return (
          <div key={i}>
            {line.length === 0 && i !== 0 && i !== lines.length - 1 ? (
              <br />
            ) : entities.length === 0 ? (
              line
            ) : (
              entities.reduce((memo: JSX.Element[], entity: any, i: number) => {
                const textBefore = line.substring(
                  beginIndex,
                  entity.indices[0]
                );
                let entityEl = null;
                const baseProps = {
                  onClick: (e: any) => {
                    e.stopPropagation();
                    viewOnly && e.preventDefault();
                  },
                  className: clsx(
                    "text-primary",
                    viewOnly ? "cursor-text" : "hover:underline"
                  ),
                };

                if (entity.url) {
                  const url = formatUrl(entity.url);
                  entityEl = (
                    <a key={i} href={entity.url} target="_blank" {...baseProps}>
                      {url.leading}
                      <span className="text-[0px]">{url.trailing}</span>
                      <span className="select-none">...</span>
                    </a>
                  );
                } else if (entity.hashtag) {
                  if (isAddress(entity.hashtag)) {
                    entityEl = (
                      <Link
                        key={i}
                        href={`/${entity.hashtag}`}
                        prefetch={false}
                        {...baseProps}
                      >
                        {formatAddress(entity.hashtag, { trailing: 0 })}
                      </Link>
                    );
                  } else {
                    entityEl = (
                      <Link
                        key={i}
                        href={`/search?q=${encodeURIComponent(
                          "#".concat(entity.hashtag)
                        )}`}
                        prefetch={false}
                        {...baseProps}
                      >
                        #{entity.hashtag}
                      </Link>
                    );
                  }
                } else if (entity.screenName) {
                  entityEl = (
                    <Link
                      key={i}
                      href={`/${entity.screenName}`}
                      prefetch={false}
                      {...baseProps}
                    >
                      @{entity.screenName}
                    </Link>
                  );
                } else if (entity.cashtag) {
                  entityEl = (
                    <Link
                      key={i}
                      href={`/search?q=${encodeURIComponent(
                        "$".concat(entity.cashtag)
                      )}`}
                      prefetch={false}
                      {...baseProps}
                    >
                      ${entity.cashtag}
                    </Link>
                  );
                }

                beginIndex = entity.indices[1];

                return i === entities.length - 1
                  ? [
                      ...memo,
                      textBefore,
                      entityEl,
                      line.substring(beginIndex, line.length),
                    ]
                  : [...memo, textBefore, entityEl];
              }, [])
            )}
          </div>
        );
      })}
    </>
  );
}
