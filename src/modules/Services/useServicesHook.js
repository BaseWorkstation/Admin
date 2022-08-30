import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createService,
  editService,
  fetchServices,
  uploadServiceImage,
} from "redux/slices/serviceSlice";
import { fetchWorkstations } from "redux/slices/workstationSlice";
import { toastError, toastSuccess } from "utils/helpers";

export default function useServicesHook() {
  const { userDetails } = useSelector((state) => state.user);
  const { workstation } = useSelector((state) => state.workstations);
  const { services, loading } = useSelector((state) => state.services);

  const currentWorkspaceId = userDetails?.owned_workstations?.[0];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!workstation) {
      dispatch(fetchWorkstations({ id: currentWorkspaceId }));
    }
    dispatch(fetchServices({ workstation_id: currentWorkspaceId }));
  }, []);

  const handleSaveService = async (service) => {
    let data;

    const workspacePayload = {
      workstation_id: currentWorkspaceId,
      plan_id: 1,
      name: service.name,
      category: service.category,
      price_per_minute: service.pricePerMinute,
      price_per_hour: service.pricePerHour,
    };

    if (service.id) {
      data = await dispatch(
        editService({
          serviceId: service.id,
          editPayload: { ...workspacePayload, price: service.pricePerMinute },
        })
      );
    } else {
      data = await dispatch(createService(workspacePayload));
    }

    const { payload, error } = data;

    if (payload?.id) {
      toastSuccess("Saved successfully!");
    } else {
      console.log(error);
      toastError(null, error);
    }
  };

  const handleUploadServiceImage = async (event, serviceId) => {
    const imageFile = event.target.files[0];
    if (!imageFile) {
      return;
    }
    const formData = new FormData();
    // append the details of the form data
    formData.append("upload_category", "service_image");
    formData.append("workstation_id", currentWorkspaceId);
    formData.append("service_id", serviceId);
    // append the file
    formData.append("file", imageFile);

    const { payload, error } = await dispatch(uploadServiceImage(formData));

    if (payload) {
    } else {
      console.log(error);
      toastError(null, error);
    }

    event.target.value = "";
  };

  return {
    workstation,
    services: services.map(({ price_per_minute, price_per_hour, ...rest }) => ({
      ...rest,
      pricePerMinute: price_per_minute?.amount,
      pricePerHour: price_per_hour?.amount,
    })),
    isLoadingServices: loading === "FETCH_SERVICES",
    isCreatingService: loading === "CREATE_SERVICE",
    isEditingService: loading === "EDIT_SERVICE",
    isUploadingImage: loading === "UPLOAD_SERVICE_IMAGE",
    handleSaveService,
    handleUploadServiceImage,
  };
}
