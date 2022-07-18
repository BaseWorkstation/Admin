import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMemberToTeam,
  deleteTeamMember,
  fetchTeamMembers,
  fetchTeams,
} from "redux/slices/teamSlice";
import { toastError, toastSuccess } from "utils/helpers";

const initialMemberDetails = {
  email: "",
};

export default function useViewTeamHook() {
  const [memberDetails, setMemberDetails] = useState(initialMemberDetails);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const { teams, teamMembers, loading } = useSelector((state) => state.teams);
  const addMemberModalState = useDisclosure();
  const deleteMemberModalState = useDisclosure();
  const dispatch = useDispatch();

  const currentTeam = teams[0];

  useEffect(() => {
    if (!teams.length) {
      dispatch(fetchTeams());
    }
  }, []);

  useEffect(() => {
    if (!!teams.length) {
      dispatch(
        fetchTeamMembers({
          team_id: currentTeam.id,
        })
      );
    }
  }, [teams.length]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberDetails({
      ...memberDetails,
      [name]: value,
    }); // onChange handler
  };

  const handleSubmitMember = async (event) => {
    event.preventDefault();

    const { payload, error } = await dispatch(
      addMemberToTeam({
        team_id: currentTeam.id,
        emails: [
          {
            email_id: memberDetails.email,
          },
        ],
      })
    );

    if (payload?.data) {
      toastSuccess("Team member has been successfully added");
      addMemberModalState.onClose();
      setMemberDetails(initialMemberDetails);
    } else {
      console.log(error);
      toastError(null, error);
    }
  };

  const openDeleteMemberConfirmation = (memberId) => {
    setMemberToRemove(memberId);
    deleteMemberModalState.onOpen();
  };

  const handleRemoveMember = async (event) => {
    event.preventDefault();

    const { error } = await dispatch(
      deleteTeamMember({
        team_id: currentTeam.id,
        user_id: memberToRemove,
      })
    );

    if (!error) {
      toastSuccess("Team member has been successfully removed");
      deleteMemberModalState.onClose();
    } else {
      console.log(error);
      toastError(null, error);
    }
  };

  return {
    teamLoading: loading === "FETCH_TEAMS" || loading === "FETCH_TEAM_MEMBERS",
    isAddingMember: loading === "ADD_TEAM_MEMBER",
    isDeletingMember: loading === "DELETE_TEAM_MEMBER",
    teams,
    teamMembers,
    memberDetails,
    handleChange,
    handleSubmitMember,
    addMemberModalState,
    deleteMemberModalState,
    openDeleteMemberConfirmation,
    handleRemoveMember,
  };
}