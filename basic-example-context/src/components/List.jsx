import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { FriendsContext } from "../contexts/FriendsContext";

export const List = () => {
  const [filter, setFilter] = useState("");
  const { friends } = useContext(FriendsContext);

  return (
    <div>
      <h1>List of Robot friends</h1>
      <input
        placeholder="Search"
        type="search"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <div className="list">
        {friends.map((friend, index) => {
          if (
            filter &&
            !friend.robotName.toLowerCase().includes(filter.toLowerCase())
          )
            return null;
          return (
            <RobotCard
              key={index}
              className="card"
              robotImage={friend.robotImage}
              robotName={friend.robotName}
            />
          );
        })}
      </div>
    </div>
  );
};

const RobotCard = ({ robotName, robotImage }) => {
  return (
    <div className="card">
      <h3>{robotName}</h3>
      <img src={robotImage} alt={robotName} />
    </div>
  );
};

RobotCard.propTypes = {
  robotName: PropTypes.string.isRequired,
  robotImage: PropTypes.string.isRequired,
};
