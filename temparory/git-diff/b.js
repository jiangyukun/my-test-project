
export async function getFirms(req: IRequest, res: IResponse, next: NextFunction): Promise<void> {
  try {
    const _process = process as any;
    const firmId = req._firmId;
    let firmArr: any = [];
    // isFilterRoot属性区分是否过滤掉root本身，false为不过滤
    const reply = await firmsControllers.getFirms(req, { firmTypeIds: _process._firmType['Platform'], isFilterRoot: false });
    firmArr = firmArr.concat(reply.results);
    const _reply = await firmsControllers.getFirmsOperator(req, {   firmId });
    const _firmArr = baseHandler.cloneObj(_reply.results);
    firmArr = firmArr.concat(_firmArr);
    req._firmArr = firmArr;
    next();
  } catch (e) {
    next(e);
  }
}
