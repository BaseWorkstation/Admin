import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkstations,
  fetchGeneralStats,
} from "redux/slices/workstationSlice";
import { formatDateToYYYYMMDD } from "utils/helpers";

const initialStartDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1
);

export default function useStatsHook() {
  const [startDay, setStartDay] = useState(initialStartDate);
  const [endDay, setEndDay] = useState(new Date());
  const [workstationId, setWorkstationId] = useState(null);
  const { userDetails } = useSelector((state) => state.user);
  const { workstations, generalStats, loading } = useSelector(
    (state) => state.workstations
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!workstations.length) {
      dispatch(fetchWorkstations());
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchGeneralStats({
        from_date: formatDateToYYYYMMDD(startDay),
        to_date: formatDateToYYYYMMDD(endDay),
        workstation_id: workstationId,
      })
    );
  }, [startDay, endDay, workstationId]);

  return {
    startDay,
    setStartDay,
    endDay,
    setEndDay,
    workstationId,
    setWorkstationId,
    statsLoading: loading === "FETCH_GENERAL_STATS",
    workstations,
    generalStats,
  };
}
