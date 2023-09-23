import { Inject } from "@nestjs/common";
import { getEmailInstanceToken } from "./email.constants";

export const InjectEmailTransport = () => Inject(getEmailInstanceToken());
