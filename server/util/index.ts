/**
 * server/util/index.ts
 *
 * Utility functions used throughout the app
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import { Request, Response, NextFunction } from "express";
import { FieldInfo, Parser } from "json2csv";

/**
 * Redirect the user to the login page if not logged in
 */
export function authguard(req: Request, res: Response, next: NextFunction): void {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
}

export const downloadResource = (res: Response, filename: string, fields: FieldInfo<unknown>[],  data: unknown[]): void => {
    const json2cvs = new Parser({ fields });
    const cvs = json2cvs.parse(data);
    res.header("Content-Type", "text/csv");
    res.attachment(filename);
    res.send(cvs);
};
