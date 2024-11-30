import { useEffect, useState } from "react";
import { DatePicker, Space } from 'antd';
import Card from "./card";
import AddCard from "./addCard";
import LexiModal from '../../../../components/lexi-modal/index.jsx';
import './index.scss';

const { RangePicker } = DatePicker;

const cards = [
    {
        key: '1',
        name: "Amount Spent"
    },
    {
        key: '2',
        name: "Days Left"
    },
    {
        key: '3',
        name: "Link Clicks"
    },
    {
        key: '4',
        name: "Impressions"
    },
    {
        key: '5',
        name: "Amount Spent"
    },
    {
        key: '6',
        name: "Days Left"
    },
    {
        key: '7',
        name: "Link Clicks"
    },
    {
        key: '8',
        name: "Impressions"
    }
]

function DashBoard(props) {
    const [isPublished, setIsPublished] = useState(false);       // should be passed in from props
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Confirm to turn off ads");
    const [modalContent, setModalContent] = useState("Ads will stop running after being turned off")

    useEffect(() => {
        if (isPublished) {
            setModalTitle("Confirm to turn off")
            setModalContent("Ads will stop running after being turned off")
        } else {
            setModalTitle("Budget is too low")
            setModalContent("Each ad set requires a minimum budget of $1. Please adjust you total budget to proceed")
        }
    }, [isPublished])

    const handlePublish = () => {
        setIsPublished(true)
        setShowModal(true)
    }

    const handleTurnOff = () => {
        setIsPublished(false)
        setShowModal(true)
    }

    const handleOk = () => {
        console.log("ok")
        setShowModal(false)
    }

    const handleCancel = () => {
        console.log("cancel")
        setShowModal(false)
    }

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

            <div className="dashboard-card">
                {
                    cards.map((item, index) => {
                        return (
                            <Card item={item} />
                        )
                    })
                }
            </div>

            <div className="dashboard-publish">
                <div className="add-publish">
                    <div className="add-publish-text">
                        <div className="text-control">Lexi control</div>
                        <div>Your adds has not been add it is a draft status on meta</div>
                    </div>
                    {!isPublished && <div className="add-publish-btn">
                        <button onClick={handlePublish}>Publish ads</button>
                    </div>}
                    {isPublished && <div className="add-turnoff-btn">
                        <button onClick={handleTurnOff}>Turn off</button>
                    </div>}
                </div>
                <div className="add-detail">
                    <AddCard first="Daily budget" second="$20" />
                    <AddCard first="End date" second="2024-11-25" />
                </div>
            </div>


            <div className="effect-btn-container">
                <button onClick={() => {
                    console.log("dash board click triggered", props.isDashboard)
                    props.setIsDashboard(!props.isDashboard)
                }}
                    className="effect-add-plan"
                >Check Ad Plan</button>
            </div>

            <LexiModal
                open={showModal}
                handleConfirm={handleOk}
                handleCancel={handleCancel}
                title={modalTitle}
                content={modalContent}
                showTitle={false}
                isPublished={isPublished}
                isFromDashboard={true}
            />
        </div>
    )
}

export default DashBoard;