import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { metaConfig } from "../../config/metaConfig";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filename = req.query.param;

  //   const fileName = childRow.fact2.split("uploads/")[1];
  const pJsonString: any = {
    sessionId: "65178215-7896-4513-8e26-896df9cb36ad",
    command: "getPhysicalFile",
    parameters: {
      physicalPath: filename,
    },
  };

  const drestApiAddress =
    metaConfig.CommandGetFile + JSON.stringify(pJsonString);

  let { data } = await axios.get<Readable>(drestApiAddress, {
    responseType: "stream",
  });

  res.setHeader("content-disposition", `attachment; filename="${filename}"`);

  //   console.log("data :>> ", data);
  data.pipe(res);
}

export default handler;
