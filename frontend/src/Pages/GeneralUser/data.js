import axios from "axios";

const API_URL = "http://localhost:4000/members";

const getMonthlyJoined = async () => {
    try {
        const res = await axios.get(`${API_URL}/monthly-member`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(err);
        return { members: [] };
    }
}

const threeDayExpire = async () => {
    try {
        const res = await axios.get(`${API_URL}/expiring-3-days`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(err);
        return { members: [] };
    }
}


const fourToSevenDaysExpire = async () => {
    try {
        const res = await axios.get(`${API_URL}/expiring-4-7-days`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(err);
        return { members: [] };
    }
}

const expired = async () => {
    try {
        const res = await axios.get(`${API_URL}/expired-member`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(err);
        return { members: [] };
    }
}

const inActiveMembers = async () => {
    try {
        const res = await axios.get(`${API_URL}/inactive-member`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(err);
        return { members: [] };
    }
}

export {getMonthlyJoined, threeDayExpire, fourToSevenDaysExpire, expired, inActiveMembers};