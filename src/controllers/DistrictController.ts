// const district = require('../../services/DistrictService');
import { Request, Response } from 'express';
import district from '../models/district';
import DistrictService from '../services/DistrictService';

class DistrictController {
    static getAll = async (req: Request, res: Response) => {
        const id_province : string = req.params.id_province;
        const listDistrict : district[] = await DistrictService.findByProvinceID(id_province);
        res.status(201).json(listDistrict);
    }

    


}

export default DistrictController