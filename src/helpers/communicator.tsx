import axios from "axios";

export const getQuestion = async (conversation : any) => {
    const res = await axios.post("/aiAgent/getQuestion", {
        conversation: conversation, 
    });

    if (res.status !== 200) {
        throw new Error("Unable to fetch answer to user query");
    }

    const data = await res.data; 
    return data;
};
