const proxyURL = "https://cors-anywhere.herokuapp.com";
const aiMindURL = "http://13.233.115.212";

export const getQuestion = async (conversation: any) => {
    const res = await fetch(`${proxyURL}/${aiMindURL}/aiAgent/getQuestion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            conversation: conversation,
        }),
    });

    if (res.status !== 200) {
        throw new Error("Unable to fetch answer to user query");
    }

    const data = await res.json();
    return data;
};