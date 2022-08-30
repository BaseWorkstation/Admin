import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkstation,
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
  const { userDetails } = useSelector((state) => state.user);
  const { workstation, generalStats, loading } = useSelector(
    (state) => state.workstations
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchGeneralStats({
        from_date: formatDateToYYYYMMDD(startDay),
        to_date: formatDateToYYYYMMDD(endDay),
      })
    );
  }, [startDay, endDay]);

  return {
    startDay,
    setStartDay,
    endDay,
    setEndDay,
    statsLoading: loading === "FETCH_GENERAL_STATS",
    generalStats,
  };
}
