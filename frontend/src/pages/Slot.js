import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

function Slot() {
  const dispatch = useDispatch();
  const [slot, setSlot] = useState([]);

  const getSlotData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/admin/get-slot-data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.message) {
        setSlot(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const [applications, setapplications] = useState([]);
  const [slotId, setslotId] = useState();

  const getApprovedApplications = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/admin/get-approved-applications", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());

      if (response.data.message) {
        setapplications(response.data.data);
      }
    } catch (error) {
      console.log("Error in feching Approved Application data");
      dispatch(hideLoading());
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id) => {
    console.log(id, "vlauevlaue");
    setslotId(id);
    console.log(slotId, "slotId ethiii monuu");
    setIsModalOpen(true);
    getApprovedApplications();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const slotBooking = async (appId, userId) => {
    try {
      dispatch(showLoading());
      let response = await axios.post(
        "/admin/confirm-slot-details",
        { appId, userId, slotId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.message) {
        toast.success(response.data.message);
        getSlotData();
      }
    } catch (error) {
      console.log(error, "Slot confirming error");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSlotData();
  }, []);

  return (
    <Layout>
      <h2 className="page-title my-5">Slots</h2>
      {slot?.map((slot) => {
        return (
          <Button
            id="button"
            type="primary me-4 mt-3"
            disabled={slot.status}
            onClick={() => showModal(slot._id)}
          >
            {slot.name}
          </Button>
        );
      })}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {applications.map((applications) => {
          return (
            <div className="d-flex justify-content-between">
              <h5>{applications.companyName}</h5>
              <i
                className="ri-checkbox-circle-line action-link text-success"
                onClick={() => {
                  slotBooking(applications._id, applications.user);
                }}
              ></i>
            </div>
          );
        })}
      </Modal>
    </Layout>
  );
}

export default Slot;
