"use client";

import _ from "lodash";
import Modal from "components/Modal";
import { Dialog } from "@headlessui/react";
import Button from "components/Button";
import { HiCheck, HiPlus } from "react-icons/hi";
import clsx from "clsx";
import { usePopularTopics } from "hooks/usePopularTopics";
import { useCallback, useState } from "react";
import { Topic } from "state/types";

export default function ChooseTopicsModal({
  showOnStart,
}: {
  showOnStart: boolean;
}) {
  const { topics, chooseTopics } = usePopularTopics();
  const [chosenTopics, setChosenTopics] = useState<Topic[]>([]);

  const select = useCallback(
    (topic: Topic) => {
      setChosenTopics([...chosenTopics, topic]);
    },
    [chosenTopics]
  );

  const deselect = useCallback(
    (topic: Topic) => {
      setChosenTopics(chosenTopics.filter((chosenId) => chosenId !== topic));
    },
    [chosenTopics]
  );

  const submit = useCallback(async () => {
    if (chooseTopics && chosenTopics.length >= 3) {
      await chooseTopics(chosenTopics);
      return
    }
    throw new Error('Please select three or more topics.')
  }, [chooseTopics, chosenTopics]);

  return (
    <Modal show={showOnStart}>
      {({ closeModal }) => (
        <>
          <Dialog.Title className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <div className="text-xl font-semibold">
                What are your interests?
              </div>
              <div className="flex justify-between text-secondary-text">
                Choose three or more.
              </div>
            </div>
          </Dialog.Title>

          <div className="w-full px-2 pt-2 pb-3 my-3 text-center">
            {topics.map((topic: Topic, i: number) => {
              const isSelected = chosenTopics.some(
                (chosen) => chosen.topic_id === topic.topic_id
              );
              return (
                <div
                  key={topic.topic_id}
                  className="inline-block mx-1 my-1 w-max"
                >
                  <Button
                    size="sm"
                    kind="outline-active-positive"
                    className={clsx("group")}
                    active={isSelected}
                    onClick={() =>
                      isSelected ? deselect(topic) : select(topic)
                    }
                  >
                    {topic.topic_name}
                    {isSelected ? <HiCheck /> : <HiPlus />}
                  </Button>
                </div>
              );
            })}
          </div>

          <Dialog.Title className="flex justify-end pt-3 border-t border-secondary-text border-opacity-10">
            <Button
              size="sm"
              kind="solid-black"
              onClick={async () => {
                await submit();
                closeModal();
              }}
            >
              Continue
            </Button>
          </Dialog.Title>
        </>
      )}
    </Modal>
  );
}
