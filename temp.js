import { styled, TextField } from "@mui/material";
import React, { useState, useEffect, Component } from "react";
import { useSelector } from "react-redux";
import WarningImg from "assets/images/leaderboard/warning.png";
// import { refreshAll, G_XPRank, Leader_L_rank, MiningPowerRank, DropRank } from "BlockchainInteractionWax.js"
import Tippy from "@tippyjs/react";

import { anchorGetGRank, getLastActionMessage, anchorGetMPower, anchorGetMLCleanCashe, anchorGetuserinfors } from "BlockchainInteractionWax";

import { FaInfoCircle, FaPlus } from "react-icons/fa";
import ProfileForm from '../Profile/profileForm';

const MyTextField = styled(TextField)({
    border: '1px #787878 solid',
    borderRadius: '5px',
    input: {
        color: '#fff'
    }
})

const Information = ({ ual }) => {

    const [gRank, setGRank] = useState(0);
    const [StopSearch, setStopSearch] = useState(0);
    const [sucessfulDrop, setSucessfulDrop] = useState(0);
    const [shootout, setShootout] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [mPower, setMPower] = useState(0);
    const [lCCashe, setLCCashe] = useState(0);
    const [popUpMessage, setPopUpMessage] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const store = useSelector((state) => state);

    const fetchData = async () => {
        if (ual.activeUser) {
            const value = await anchorGetGRank(ual);
            setGRank(parseFloat(value).toFixed(1));
            const MiningP_Rank = await anchorGetMPower(ual);
            setMPower(MiningP_Rank);
            const LCleanCashe = await anchorGetMLCleanCashe(ual);
            console.log("mining++", LCleanCashe)
            setLCCashe(LCleanCashe);
            const StopSearchEvent = await anchorGetuserinfors(ual, "consignment_stop_search");
            setStopSearch(StopSearchEvent);
            const SucessfulDrop = await anchorGetuserinfors(ual, "successful_drops");
            setSucessfulDrop(SucessfulDrop);
            const shootout = await anchorGetuserinfors(ual, "consignment_shoot_out");
            setShootout(shootout);
        }
    };

    useEffect(() => {
        fetchData();
    }, [store]);

    async function getLastAction() {
        const value7 = await getLastActionMessage(ual);
        setPopUpMessage(value7)
        setIsPopupOpen(true);
    }

    return (
        <div
            className="mx-2 mr-2 mb-5 rounded-md py-8 px-5 text-lg border border-[#252525] text-white text-center justify-center items-center"
        >
            <div className="flex flex-row justify-between">
                <div className="flex flex-col flex-1 w-1/3">

                </div>
                <div className="flex flex-col flex-1 w-1/3 text-center">
                    <div className="w-full flex flex-col items-center justify-center mb-2 relative">
                        <TooltipForAvatar />
                    </div>
                </div>
                <div className="flex flex-col flex-1 w-1/3">

                </div>
            </div>
            <div className="flex flex-row mb-4">
                <div className="flex flex-col  w-1/3 ">

                </div>
                <div className="flex flex-col w-1/3 p-4 justify-center items-center">
                    <button onClick={() => setIsOpen(true)} style={{ height: '120px', width: '120px' }} class="b-8 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] rounded-md font-bold">
                        <FaPlus />
                    </button>
                    <ProfileForm setIsOpen={setIsOpen} isOpen={isOpen} ual={ual} />
                </div>

            </div>
            <div className="flex flex-row  mb-4">
                <div className="flex flex-col w-2/3">
                    <button onClick={(e) => { getLastAction() }} class="p-2 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] rounded-md font-bold flex flex-1">Register</button>
                </div>
                <div className="flex flex-col flex-1 justify-center pl-5">
                    <div className="w-full flex flex-col items-start mb-2 relative">
                        <TooltipForRegisterInfo />
                    </div>
                </div>
            </div>
            <div className="flex flex-row mb-4">
                <div className="flex flex-col w-2/3 ">
                    <MyTextField
                        className=" text-base text-white text-center"
                        placeholder="Enter gang name..."
                        focused={false}
                        size="small"
                    />
                </div>
                <div className="flex flex-col flex-1 pl-5 justify-center" >
                    <div className="w-full flex flex-col items-start justify-center mb-2 relative">
                        <TooltipForWarning />
                    </div>
                </div>
            </div>
            <div className="flex flex-row mb-4">
                <div className="flex flex-col w-2/3">
                    <button onClick={(e) => { getLastAction() }} class="p-2 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] rounded-md font-bold flex flex-1">Get Report</button>
                </div>
            </div>
            <div className="flex flex-row mb-4">
                {isPopupOpen && (

                    <div className="flex flex-col items-center w-full bg-[#1a1b1f] border border-solid justify-center border-gray-500 rounded-xl py-4 px-6"
                        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}>
                        <p className="text-white text-md font-semibold mb-4" style={{ textAlign: 'center' }}>
                            {popUpMessage}
                        </p>
                        <button className="flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
                            onClick={() => setIsPopupOpen(false)}>
                            Close
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-row mb-4 justify-center">
                <table className="w-full border border-[#2F2F2E] text-center p-1">
                    <thead>
                        <tr className="p-2">
                            <th className="text-[#787878] text-bold-900 justify-center w-full p-4" colspan={2}>
                                Gang States
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <div className="p-1">
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    G Rank
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    {gRank}
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Total Bonus Reward
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    0%
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Dirty Cash per sec
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    {parseFloat(mPower).toFixed(6)}
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Dirty Cash per min
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    {parseFloat(mPower * 60).toFixed(6)}
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Dirty Cash per hour
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    {parseFloat(mPower * 3600).toFixed(6)}
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Laundered Clean Cash
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    {lCCashe}
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Hustlers Token per sec
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    0
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Hustlers Token per miin
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    0
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Hustlers Token per hour
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    0
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Sucessful Collections
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    0
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Stop & Searches
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    {StopSearch}
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Police Shootouts
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    {shootout}
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Successful Drops
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    {sucessfulDrop}
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Compromised Drops
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    0
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Intercepted Drops
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    0
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                    Times Arrested
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    0
                                </td>
                            </tr>
                        </div>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-row justify-center">
                <table className="w-full border border-[#2F2F2E] text-center">
                    <thead>
                        <tr className="p-2">
                            <th className="text-[#787878] text-bold-900 justify-center w-full p-4" colspan={2}>
                                World Stats
                            </th>
                        </tr>
                    </thead>
                    <tbody className="p-1">
                        <div className="p-1">
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                Sucessful Drug Deals
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    <div>
                                        0
                                    </div>
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                Stop & Searches
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    <div>
                                        0
                                    </div>
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                Police Shootouts
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    <div>
                                        0
                                    </div>
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                Successful Drops
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    <div>
                                        0
                                    </div>
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                Compromised Drops
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    <div>
                                        0
                                    </div>
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                Intercepted Drops
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    <div>
                                        0
                                    </div>
                                </td>
                            </tr>
                            <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                                <td className="w-1/2 p-2 mr-1">
                                Total Arrests
                                </td>
                                <td className="flex w-1/2 p-2 items-center justify-center">
                                    <div>
                                        0
                                    </div>
                                </td>
                            </tr>
                            {
                                worldStats.map((val, idx) => {
                                    return (<tr className="p-2 border-t border-[#2F2F2E] flex w-full" key={idx}>
                                        <td className="w-1/2 p-2 mr-1">
                                            {val}
                                        </td>
                                        <td className="flex w-1/2 p-2 items-center justify-center">
                                            <div>
                                                0.00000
                                            </div>
                                        </td>
                                    </tr>)
                                })
                            }
                        </div>
                    </tbody>
                </table>
            </div>
            {/* <div>
        <div className="flex flex-col gap-y-1">
          <div className="text-white">
            <div className="box-border flex flex-col items-start gap-1 gap-x-2">
              <p className="flex-shrink-0">Name:</p>
              <MyTextField
                className="text-base text-white"
                placeholder="Enter name..."
                focused={false}
                size="small"
              />
            </div>
            <div className="my-3 box-border flex flex-col items-start gap-1 gap-x-2">
              <p className="flex-shrink-0">Gang:</p>
              <div className="flex flex-row">
                <MyTextField
                  className=" text-base text-white"
                  placeholder="Enter gang name..."
                  focused={false}
                  size="small"
                />
                <button className="mx-5 block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
                  style={{ height: "30px", marginTop: "auto", marginBottom: "auto" }} onClick={(e) => { getLastAction() }}>Rename  </button>
              </div>
            </div>
            <div className="mt-1 flex justify-left">
              <button className="my-1 block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
                onClick={(e) => { getLastAction() }}>Register  </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-4">
          <span className="font-bold text-white"> Hustler Stats: </span>
        </div>
        {isPopupOpen && (

          <div className="flex flex-col items-center w-full bg-[#1a1b1f] border border-solid justify-center border-gray-500 rounded-xl py-4 px-6"
            style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}>
            <p className="text-white text-md font-semibold mb-4" style={{ textAlign: 'center' }}>
              {popUpMessage}
            </p>
            <button className="flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
              onClick={() => setIsPopupOpen(false)}>
              Close
            </button>
          </div>
        )}
        <div className="mt-5 flex justify-left">
          <button className="my-5 block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
            onClick={(e) => { getLastAction() }}>Get Report  </button>
        </div>
        <div className="mt-2">
          <Item text={"G Rank"} value={gRank} />
          <Item text={"Total Bonus Reward"} value={"0%"} />
          <Item text={"Dirty Cash per sec"} value={parseFloat(mPower).toFixed(6)} />
          <Item text={"Dirty Cash per min"} value={parseFloat(mPower * 60).toFixed(6)} />
          <Item text={"Dirty Cash per hour"} value={parseFloat(mPower * 3600).toFixed(6)} />
          <Item text={"Laundered Clean Cash"} value={lCCashe} />
          <Item text={" Hustlers Token per sec "} value={"0"} />
          <Item text={" Hustlers Token per min"} value={"0"} />
          <Item text={" Hustlers Token per hour"} value={"0"} />
          <Item text={"Sucessful Collections"} value={"0"} />
          <Item text={"Stop & Searches"} value={StopSearch} />
          <Item text={"Police Shootouts"} value={shootout} />
          <Item text={"Successful Drops"} value={sucessfulDrop} />
          <Item text={"Compromised Drops"} value={"0"} />
          <Item text={"Intercepted Drops"} value={"0"} />
          <Item text={"Times Arrested"} value={"0"} />
        </div>
        <div>
          <div className="my-4">
            <span className="font-bold text-white"> World Stats: </span>
          </div>

        </div>
        <div className="mt-2">
          <Item text={"Sucessful Drug Deals"} value={"0"} />
          <Item text={"Stop & Searches"} value={"0"} />
          <Item text={"Police Shootouts"} value={"0"} />
          <Item text={"Successful Drops"} value={"0"} />
          <Item text={"Compromised Drops"} value={"0"} />
          <Item text={"Intercepted Drops"} value={"0"} />
          <Item text={"Total Arrests"} value={"0"} />
        </div>
      </div> */}
        </div>
    );
};

class TooltipForAvatar extends Component {
    render() {
        return (
            <Tippy
                content={<span className="">At G Rank 100 and Hustling power 0.0192 you can add PFP to your profile</span>}
                popperOptions={{
                    placement: "right",
                }}
            >
                <p className="text-xl text-white">
                    <FaInfoCircle />
                </p>
            </Tippy>
        );
    }
}

class TooltipForRegisterInfo extends Component {
    render() {
        return (
            <Tippy
                content={<span className="">Registered Gang will appear on the leaderboard. To register a gang you will need to be G rank level 100 with a 0.0192 Dirty Cash per Sec hustling power. The initial registration will cost 100 Clean Cash, followed by subsequent registrations at a rate of 20 Clean each</span>}
                popperOptions={{
                    placement: "right",
                }}
            >
                <p className="text-xl text-white">
                    <FaInfoCircle />
                </p>
            </Tippy>
        );
    }
}

class TooltipForWarning extends Component {
    render() {
        return (
            <Tippy
                content={<span className="">Warning: Gang names must be free of offensive or discriminatory words. Ban risk looms if rules aren't respected. Play fair, play!</span>}
                popperOptions={{
                    placement: "right",
                }}
            >
                <p className="text-xl text-white">
                    <img src={WarningImg} className="h-6 w-6" alt="" />
                </p>
            </Tippy>
        );
    }
}

const Item = ({ text, value }) => (
    <div className="flex items-center justify-between text-white">
        <span className="font-bold">{text}:</span>
        <span className="relative left-2 w-12">{value}</span>
    </div>
);

export default Information;
