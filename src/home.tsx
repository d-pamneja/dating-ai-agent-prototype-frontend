import { useState } from 'react';
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { ScrollArea } from "./components/ui/scroll-area"
import { toast } from 'react-hot-toast';
import { Sparkles, BotIcon,MessageCircleMoreIcon,Loader2Icon,ArrowBigUpIcon } from 'lucide-react';
import { getQuestion } from './helpers/communicator';


const SAMPLE_CONVERSATIONS = [
  {
    id: 1,
    name: "Example 1",
    messages: [
      { sender: 'User B', text: "Umm, I wanted to talk about last night. It was fun hanging out, but I felt a little off with some things tbh." },
      { sender: 'User A', text: "Oh really? I mean, I thought it went well. You seemed happy, what did you feel went off?" },
      { sender: 'User B', text: "I mean, your friends are nice and all, but... idk, I felt like some of their jokes were a bit uncalled for…" },
      { sender: 'User A', text: "Honestly I feel you are taking this a bit to seriously. Is it about the joke where they mentioned you leaving you job to start you cafe?" },
      { sender: 'User B', text: "You know what it means to me. The past few months have been full of anxiety for me…" },
      { sender: 'User B', text: "Last thing I want is tongue-in-cheek humour and you laughing with them" },
      { sender: 'User A', text: "I did not mean to disrespect you, you know I have been there for you right? how does it matter what they say?" },
      { sender: 'User B', text: "idk it just left a sour taste for the entire evening for me…" }
    ]
  },
  {
    id: 2,
    name: "Example 2",
    messages: [
      { sender: 'User A', text: "So are you ready to go for the movie tonight?" },
      { sender: 'User A', text: "It's Fri-Yay date night!!!" },
      { sender: 'User B', text: "Tbh I don't feel like going out more often...could'nt we like stay in?" },
      { sender: 'User B', text: "The new season of 'You' is on Netflix we could binge.." },
      { sender: 'User A', text: "Idk this feels a bit random and out of the blue.." },
      { sender: 'User B', text: "Please it's not like I don't wanna go out with you. Just that it could be a bit chill than OTT" },
      { sender: 'User A', text: "But then it's fun to go out, plus this movie seems fun as well." },
      { sender: 'User B', text: "idk if you are in the mood we could go" }
    ]
  },
  {
    id: 3,
    name: "Example 3",
    messages: [
      { sender: 'User A', text: "So I hope you liked the surprise today? :-)) " },
      { sender: 'User A', text: "I know you like pasta and cheesecake so I thought let's make it" },
      { sender: 'User B', text: "Umm yes, it was nice. Thanks" },
      { sender: 'User A', text: "Is something wrong?" },
      { sender: 'User B', text: "No, nothing like that" },
      { sender: 'User B', text: "Been a bit rough few weeks at the office that's all" },
      { sender: 'User A', text: "That's exactly why I did that na..." },
      { sender: 'User B', text: "ik ik and I'm glad you did" },
      { sender: 'User B', text: "maybe I am not in the mood to be that expressive tonight tbh" },
      { sender: 'User A', text: "ughh well ig that's just how it is" },
    ]
  }
];

export const LokiMuseChatPrototype = () => {
    const [messages, setMessages] = useState<Array<any>|null>(null);
    const [agentIntervention, setAgentIntervention] = useState<Object | null>(null);
    const [loading,setLoading] = useState(false)
  
    const fetchAnswer = async (messagesText: string[]) => {
        setLoading(true)
      const response = await getQuestion(JSON.stringify(messagesText));
      if (response) {
        toast.success('Scroll Down to see Intervention ↓', { id: 'fetchResponse' });
        setAgentIntervention({ "output": response.response });
        setLoading(false)
      } else {
        toast.error('Could not generate output');
        console.error("Error");
      }
    };
  
    const handleUploadConversation = (conversation: any) => {
      setMessages(conversation.messages);
      setAgentIntervention(null);
      setLoading(false)
    };  

  
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 text-green-600" /> Loki's Muse
            </CardTitle>
            <div className="flex space-x-2">
              {SAMPLE_CONVERSATIONS.map((conv) => (
                <Button
                  key={conv.id}
                  variant="outline"
                  onClick={() => handleUploadConversation(conv)}
                >
                  <MessageCircleMoreIcon className="mr-2 h-4 w-4" /> {conv.name}
                </Button>
              ))}
            </div>
          </CardHeader>
  
          <CardContent>
            <ScrollArea className="h-[400px] w-full border rounded-md p-4">
              <div className="h-full overflow-auto relative">
                {messages && messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg ${
                      msg.sender === "User B" ? 'bg-green-100 text-right' : 'bg-blue-100 text-left'
                    }`}
                  >
                    <div className="font-bold">{msg.sender}</div>
                    <div className="mt-2">{msg.text}</div>
                  </div>
                ))}
  
                {agentIntervention && (
                  <div className="bg-purple-100 p-3 rounded-lg mb-2 italic">
                    <strong>Loki's Muse Response</strong>
                    <br />
                    // @ts-ignore
                    {agentIntervention.output}
                  </div>
                )}
  
                
              </div>
            </ScrollArea>
            
            {!loading && messages &&  (
                <div className="flex justify-center items-center mt-4 flex space-x-2">
                    <Button onClick={() => fetchAnswer(messages.map((msg) => msg.text))}>
                        <BotIcon className="mr-2" /> Generate Intervention
                    </Button>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center mt-4 flex space-x-2">
                    <Button>
                        <Loader2Icon className="mr-2 animate-spin" /> Loading
                    </Button>
                </div>
            )}

            {!messages && (
                <div className="flex justify-center items-center mt-4 flex space-x-2">
                    <Button disabled>
                        <ArrowBigUpIcon className="mr-2" /> Load Example
                    </Button>
                </div>
            )}
            
          </CardContent>
        </Card>
      </div>
    );
};
  
export default LokiMuseChatPrototype;