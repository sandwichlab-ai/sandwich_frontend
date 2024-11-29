import { useEffect } from "react";
import { DatePicker, Space } from 'antd';
import './index.scss';

const { RangePicker } = DatePicker;

function DashBoard(props) {
    return (
        <div className="dashboard__container">

            <div className="dashboard-header">
                Ads Dashboard

                <RangePicker />
            </div>

            <div className="dashboard-promotion">
                <div className="promotion-title">Promotion</div>
                <div className="promotion-info">
                    <span>Duration: 2024-11-15 - 2024-11-25</span>
                    <span>Daily budget: $20</span>
                    <span>Ad sets choices: 1</span>
                </div>
            </div>

            <div className="dashboard__card">
                tabs
            </div>

            <div className="dashboard__publish">
                adds publish
            </div>


            <button onClick={() => {
                console.log("dash board click triggered", props.isDashboard)
                props.setIsDashboard(!props.isDashboard)
            }}>dashboard</button>
        </div>
    )
}

export default DashBoard;