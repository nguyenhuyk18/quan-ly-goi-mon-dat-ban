import { Request, Response } from 'express';
import ReservationService from '../services/ReservationService';
import reservation from '../models/reservation';
import TableService from '../services/TableService';
import FloorService from '../services/FloorService';

class ReservationController {
    static getAll = async (req: Request, res: Response) => {
        const list: reservation[] = await ReservationService.getAll();
        res.status(201).json(list);
    }


    static delete = async (req: Request, res: Response) => {
        const id : number = Number(req.params.id);
        const tmp = await ReservationService.find(id);
        if (!tmp) {
            res.status(404).json({ message: `Không tìm thấy đặt bàn với mã là ${id}` });
            return;
        }

        if (await ReservationService.delete(id)) {
            res.status(200).json({ message: `Xoá đặt bàn với mã là ${id} thành công !!` });
            return;
        }
        res.status(500).json({ message: `Xoá đặt bàn với mã là ${id} không thành công !!!` });
    }

    static findByID = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        const mreservation: reservation = await ReservationService.find(id);

        if (!mreservation) {
            res.status(404).json({ message: `Không tìm thấy đặt bàn với mã là ${id}` });
            return;
        }

        const mtable = await TableService.find(mreservation.table_id);
        const mfloor = await FloorService.find(mtable.floor_id);

        const information = {
            ...mreservation,
            table_name : mtable.name_table,
            floor_name : mfloor.name_floor,
        }

        res.status(201).json(information);
    }



    static store = async (req: Request, res: Response) => {
        const data = req.body;

        if (!data?.customer_id || !data?.table_id || !data?.staff_id || !data?.reservation_date || !data?.amount_cus || !data?.note || !data?.status) {
            res.status(400).json({ message: `Dữ liệu thêm không hợp lệ !!!` });
            return;
        }

        const tmp: reservation = new reservation(null, data.customer_id, data.table_id, data.staff_id, data.reservation_date, data.amount_cus, data.note, data.status);

        if ((await ReservationService.save(tmp))) {
            res.status(201).json({ message: `Thêm đặt bàn thành công !!` });
            return;
        }

        res.status(500).json({ message: `Thêm đặt bàn thất bại !!` });
    }

    static update = async (req: Request, res: Response) => {
        const data = req.body;

        if (!data.id || !data.customer_id || !data.table_id || !data.staff_id || !data.reservation_date || !data.amount_cus || !data.note || !data.status) {
            res.status(400).json({ message: `Không thể cập nhật vì thiếu dữ liệu !!!` });
            return;
        }

        const oldData: reservation = await ReservationService.find(Number(data.id));
        // Kiểm tra xem có tìm thấy đặt bàn cũ không
        if (!oldData) {
            res.status(404).json({ message: `Không tìm thấy đặt bàn với id là ${data.id}` });
            return;
        }

        oldData.customer_id = data.customer_id;
        oldData.table_id = data.table_id;
        oldData.staff_id = data.staff_id;
        oldData.reservation_date = data.reservation_date;
        oldData.amount_cus = data.amount_cus;
        oldData.note = data.note;
        oldData.status = data.status;
        if (await ReservationService.update(oldData)) {
            res.status(200).json({ message: "Cập nhật đặt bàn thành công !!" });
            return;
        }
        res.status(500).json({ message: "Cập nhật đặt bàn không thành công !!!" });
        // return;
    }
  
}

export default ReservationController;