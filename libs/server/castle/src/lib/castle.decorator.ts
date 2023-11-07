import { Reflector } from "@nestjs/core";
import { Action } from "./action.enum";
import { Subject } from "./subject.enum";

export const Castle = Reflector.createDecorator<[Action, Subject]>();
