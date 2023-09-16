import { useEffect } from "react";
import { useLatestBlockQuery } from "~~/gql/types.generated";
import { useGraphStore } from "~~/services/store/graphstore";

export const useGraphMeta = (callback: () => Promise<any>) => {
  const [latestActionBlock, setLatestActionBlock] = useGraphStore(state => [
    state.latestActionBlock,
    state.setLatestActionBlock,
  ]);
  const { data: graphMeta, startPolling: pollGraphMeta, stopPolling: stopPollGraphMeta } = useLatestBlockQuery();

  useEffect(() => {
    if (latestActionBlock !== 0) {
      pollGraphMeta(2000);
    } else {
      stopPollGraphMeta();
    }
  }, [latestActionBlock, pollGraphMeta, stopPollGraphMeta]);

  useEffect(() => {
    if ((graphMeta?._meta?.block.number || 0) >= latestActionBlock) {
      callback();
      setLatestActionBlock(0);
    }
  }, [graphMeta, latestActionBlock, callback, setLatestActionBlock]);

  return null;
};
