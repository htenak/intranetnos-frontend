import { useEffect, useState } from "react";
import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSchedulesByClass } from "src/store";
import { FAIcon } from "src/assets/icon/FAIcon";
import { hourAmPmFormat } from "src/components/helpers/hourAmPmFormat";
import { Spin } from "antd";

export const ViewScheduleModal = ({ statusModal, hideModal, sizeModal }) => {
  const dispatch = useDispatch();
  const { schedulesByClass } = useSelector((state) => state.classesProfessor);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (schedulesByClass && schedulesByClass.length !== 0) {
      const data = [...schedulesByClass];
      setRows(data);
    }
  }, [schedulesByClass]);

  const hideScheduleModal = () => {
    dispatch(setSchedulesByClass(null));
    setRows([]);
    hideModal();
  };

  return (
    <CModal
      visible={statusModal}
      onClose={hideScheduleModal}
      size={sizeModal || null}
      alignment="center"
    >
      <CModalHeader>
        <CModalTitle>
          <FAIcon customClass="icon" icon={faCalendarAlt} />{" "}
          <span className="fs-6">Horario</span>
        </CModalTitle>
      </CModalHeader>
      <CModalBody style={{ fontSize: 14 }}>
        <Spin spinning={!schedulesByClass}>
          {rows && rows.length !== 0 ? (
            <ul>
              {rows.map((element) => (
                <li key={element.id}>
                  <span className="fw-bold">{element.day.name}</span> de{" "}
                  <span className="fw-bold">
                    {hourAmPmFormat(element.startTime)}
                  </span>{" "}
                  hasta{" "}
                  <span className="fw-bold">
                    {hourAmPmFormat(element.endTime)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span>Aún no hay horarios</span>
          )}
        </Spin>
      </CModalBody>
    </CModal>
  );
};
