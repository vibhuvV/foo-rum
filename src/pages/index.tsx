import { Heart, MessageSquareText, Send } from "lucide-react";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import LoginForm from "@/containers/LoginForm";
import RegisterForm from "@/containers/RegisterForm";
import Card from "@/components/Card";
import { notImplemented } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import RichTextEditor from "@/components/RichTextEditor";
import { DUMMY_POSTS } from "@/lib/constants";
import Navbar from "@/containers/Navbar";

function Index() {
  const { user } = useAuth();

  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handlePostSend = (content: string) => {
    if (!user) {
      handleLoginOpen();
      return;
    }

    setPosts((prevPosts) => [
      {
        content: { emoji: "😇", text: content },
        id: Math.random().toString(),
        user: {
          dp: user.dp,
          name: user.email,
          postedAt: "4 min ago",
        },
      },
      ...prevPosts,
    ]);
  };

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  const handlePostActions = () => {
    if (user) {
      notImplemented();
    } else {
      handleLoginOpen();
    }
  };
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center gap-6 py-4 px-2">
        <RichTextEditor
          placeholder="How are you feeling today?"
          onSubmit={handlePostSend}
        />

        {!posts.length && <p className="text-center">No post yet 😔</p>}

        {posts.map((post) => (
          <Card
            key={post.id}
            cardContainerClassName="flex-1 w-full max-w-2xl"
            captionContent={
              <div className="pt-1 flex gap-1">
                <Button
                  variant="icon"
                  color="transparent"
                  onClick={handlePostActions}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant="icon"
                  color="transparent"
                  onClick={handlePostActions}
                >
                  <MessageSquareText className="w-4 h-4" />
                </Button>
                <Button
                  variant="icon"
                  color="transparent"
                  onClick={handlePostActions}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            }
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <img
                  className="w-8 h-8 bg-red-300 rounded object-cover object-center"
                  src={post.user.dp}
                />
                <div className="flex flex-col">
                  <p className="text-xs font-medium">{post.user.name}</p>
                  <small className="text-[10px] text-neutral-400">
                    {post.user.postedAt}
                  </small>
                </div>
              </div>
              <div className="flex items-start justify-start gap-2">
                <div className="p-2 bg-neutral-100 rounded-full leading-none">
                  {post.content.emoji}
                </div>
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: post.content.text }}
                />
              </div>
            </div>
          </Card>
        ))}
      </main>

      <Dialog open={isLoginOpen} onClose={handleLoginClose}>
        <LoginForm
          onSignUpRedirect={() => {
            handleLoginClose();
            handleRegisterOpen();
          }}
          onSignIn={() => {
            handleLoginClose();
          }}
        />
      </Dialog>
      <Dialog open={isRegisterOpen} onClose={handleRegisterClose}>
        <RegisterForm
          onSignInRedirect={() => {
            handleRegisterClose();
            handleLoginOpen();
          }}
        />
      </Dialog>
    </>
  );
}

export default Index;
