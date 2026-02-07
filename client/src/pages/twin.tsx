import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/lib/store";
import { useState, useRef, useEffect } from "react";
import { Send, User } from "lucide-react";
import avatar from "@/assets/avatar.png";

export default function TwinPage() {
  const { chatHistory, addMessage } = useStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage({ role: 'user', content: input });
    setInput("");

    // Simulate simple offline AI response
    setTimeout(() => {
      const responses = [
        "That sounds reasonable. How did that affect your energy levels?",
        "I noticed you tend to get hungry around this time. Maybe try a protein-rich snack?",
        "Logging that is a great step. Consistency is key!",
        "Based on your recent sleep, you might crave carbs today. Be gentle with yourself."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage({ role: 'assistant', content: randomResponse });
    }, 1000);
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col max-w-3xl mx-auto">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-display font-bold">Ask Your Twin</h1>
          <p className="text-muted-foreground text-sm">Offline-ready guidance based on your logs.</p>
        </div>

        <div className="flex-1 bg-card rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <img src={avatar} alt="Twin" className="w-full h-full object-cover" />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-muted rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 bg-background border-t border-border flex gap-2">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your trends..."
              className="flex-1 rounded-full bg-muted/50 border-transparent focus:bg-background focus:border-primary"
            />
            <Button size="icon" className="rounded-full shrink-0" onClick={handleSend}>
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
