import { Request, Response, NextFunction } from "../../../infrastructure/server/core/Modules";
import { TextDto } from "../../../application/modules/feeling/dtos/TextReq.dto";
import BaseController from "../base/BaseController";
import {
  getFeelingTextUseCase,
  getHighestFeelingSentenceUseCase,
  getLowestFeelingSentenceUseCase,
} from "./container/index";
import { ISession } from "../../../domain/session/ISession";

class TextFeelingController extends BaseController {
  public constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/v1/feeling", this.getFeelingText);
    this.router.post("/v1/feeling/highest", this.getHighestFeelingSentence);
    this.router.post("/v1/feeling/lowest", this.getHighestFeelingSentence);
  }

  getFeelingText = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session: ISession = req.session;
      const textDto: TextDto = req.body;

      this.handleResult(res, await getFeelingTextUseCase.execute(textDto));
    } catch (error) {
      next(error);
    }
  };

  getHighestFeelingSentence = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const session: ISession = req.session;
      const textDto: TextDto = req.body;

      this.handleResult(res, await getHighestFeelingSentenceUseCase.execute(textDto));
    } catch (error) {
      next(error);
    }
  };

  getLowestFeelingSentence = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const session: ISession = req.session;
      const textDto: TextDto = req.body;

      this.handleResult(res, await getLowestFeelingSentenceUseCase.execute(textDto));
    } catch (error) {
      next(error);
    }
  };
}

export default new TextFeelingController();
