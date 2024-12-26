import { Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Form,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { MailIcon } from "../../Icons/MailIcon";
import { LockIcon } from "../../Icons/LockIcon";
import { useState } from "react";
import { doSignInWithEmailAndPassword } from "../../auth";
import { useAuth } from "../../context/authContext";

export function AuthModal() {
  const { userLoggedIn } = useAuth();
  const { onOpenChange } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  interface SignInFormEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
  }

  interface AuthError {
    message: string;
  }

  const onSubmit = async (e: SignInFormEvent): Promise<void> => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        setErrorMessage(null);
        // Reset form
        setEmail("");
        setPassword("");
      } catch (error: unknown) {
        const authError = error as AuthError;
        setErrorMessage(authError.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  // useEffect(() => {
  //   if (!userLoggedIn) {
  //     onOpen;
  //   } else {
  //     onOpenChange; // Close the modal when the user logs in
  //   }
  // }, [userLoggedIn]);

  return (
    <>
      <Modal
        isOpen={!userLoggedIn}
        placement="top-center"
        onOpenChange={onOpenChange}
        backdrop="blur"
        hideCloseButton={true}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {() => (
            <>
              {" "}
              <Alert
                isVisible={true}
                color="warning"
                title="test@email.com 123123"
              />
              <Form onSubmit={onSubmit} validationBehavior="native">
                <ModalHeader className="flex flex-col gap-1 w-full">
                  Авторизація
                </ModalHeader>
                <ModalBody className="w-full">
                  {/* {errorMessage !== null && ( */}
                  <Alert
                    isVisible={errorMessage !== null}
                    color="danger"
                    title={errorMessage}
                  />
                  {/* )} */}

                  <Input
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="Введіть ваш email"
                    variant="bordered"
                    type="email"
                    errorMessage="Введіть справжній email"
                    value={email}
                    onValueChange={setEmail}
                    isRequired
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Пароль"
                    placeholder="Введіть ваш пароль"
                    type="password"
                    variant="bordered"
                    value={password}
                    onValueChange={setPassword}
                    min={1}
                    isRequired
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Запам'ятати мене
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Забули пароль?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter className="w-full">
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={isSigningIn}
                  >
                    {isSigningIn ? "Вхід..." : "Увійти"}
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
