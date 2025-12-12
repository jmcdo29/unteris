import { Reflector } from "@nestjs/core";
import type { Action } from "./action.enum";
import type { Subject } from "./subject.enum";

export const Castle = Reflector.createDecorator<[Action, Subject]>();
