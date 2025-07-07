import { Request, Response } from 'express';
import ward from '../models/ward'
import WardService from '../services/WardService';
// import {  }

class WardController {
    static getAll = async (req : Request , res : Response) => {
        const id_district : string = req.params.id_district;
        const listWard = await WardService.findByDistrictID(id_district);
        res.status(201).json(listWard);
    }
}

module.exports = WardController;