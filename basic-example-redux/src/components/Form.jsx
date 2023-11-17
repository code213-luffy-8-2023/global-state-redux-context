const ROBOT_HASH_BASE_URL = "https://robohash.org/";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addFriend } from "../slices/friendsSlice";

export const Form = () => {
  // used to store the robot name
  const [robotName, setRobotName] = useState("");

  // used to show a spinner while the image is loading
  const [isImageLoading, setIsImageLoading] = useState(false);

  const dispatch = useDispatch();

  return (
    <div>
      <h3>Add New Friend</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(
            addFriend({
              robotName,
              robotImage: `${ROBOT_HASH_BASE_URL}${robotName}`,
            })
          );
          // reset the state
          setRobotName("");
          setIsImageLoading(false);
        }}
      >
        <LabeledInput
          required
          label="Robot Name"
          value={robotName}
          onChange={(event) => {
            setRobotName(event.target.value);

            if (event.target.value === "") setIsImageLoading(false);
            else setIsImageLoading(true);
          }}
          type="text"
          placeholder="C3PO R2D2"
          id="robot-name"
        />
        <div>
          <p>Robot Image</p>
          <div
            style={{
              backgroundColor: "var(--card-background-color)",
              width: "100px",
              height: "100px",
              position: "relative",
            }}
          >
            {isImageLoading && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(50% - 15px)",
                  left: "calc(50% - 15px)",
                }}
                className="spinner"
              ></div>
            )}
            {robotName && (
              <img
                onLoad={() => setIsImageLoading(false)}
                src={`${ROBOT_HASH_BASE_URL}${robotName}`}
                alt="robot"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            )}
          </div>
        </div>
        <button
          style={{
            marginTop: "20px",
          }}
          type="submit"
        >
          Add Friend
        </button>
      </form>
    </div>
  );
};

const LabeledInput = ({
  label,
  value,
  onChange,
  type,
  placeholder,
  id,
  required,
}) => {
  return (
    <div>
      <label htmlFor={id}>
        {label} {required && "*"}{" "}
      </label>
      <input
        required={required}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

LabeledInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
