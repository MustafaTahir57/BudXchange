import React from "react";
import { images } from "../../Utility/Images";
function Stak_table() {
  return (
    <div>
      <div className="dropdown  mt-2">
        <button
          className="btn btn_round2 dropdown-toggle  gap-3 d-flex justify-content-between align-items-center"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <p className="m-0 p-0 p_fs">Stakes</p>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
      <div className="pt-4 table-responsive ">
        <table>
          <thead>
            <tr className="fw-bold">
              <td>No</td>
              <td>Player</td>
              <td>ID</td>
              <td>Staked</td>
              <td>Total Staked</td>
              <td>Payout</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>0xcac2...658e</td>
              <td>12387</td>
              <td>
                15{" "}
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />
              </td>
              <td>
                3{" "}
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />
              </td>
              <td>98.6</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0xcac2...658e</td>
              <td>12387</td>
              <td>
                15{" "}
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />
              </td>
              <td>
                3{" "}
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />
              </td>
              <td>98.6</td>
            </tr>
            <tr>
              <td>3</td>
              <td>0xcac2...658e</td>
              <td>12387</td>
              <td>
                15{" "}
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />
              </td>
              <td>
                3{" "}
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />
              </td>
              <td>98.6</td>
            </tr>
            <tr>
              <td>4</td>
              <td>0xcac2...658e</td>
              <td>12387</td>
              <td>
                15{" "}
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />
              </td>
              <td>
                3{" "}
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />
              </td>
              <td>98.6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stak_table;
