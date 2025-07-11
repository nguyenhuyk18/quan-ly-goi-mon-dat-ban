import PermissionService from "../services/PermissionService";
import ActionService from "../services/ActionService";
import RoleService from "../services/RoleService";
import StaffService from "../services/StaffService";
import permission from "../models/permission";
import action from "../models/action";
import role from "../models/role";
import staff from "../models/staff";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";

class AuthController {
    static login = async (req : Request, res : Response) => {
        const data = req.body;

        if( typeof data == 'undefined') {
            res.status(400).json({message : 'Thông tin đăng nhập không đầy đủ !!!'});
            return;
        }

        if( !data?.email || !data?.password ) {
            res.status(400).json({message : 'Thông tin đăng nhập không đầy đủ !!!'});
            return;
        }


        const mstaff : staff = await StaffService.findByEmail(data.email);
        if(!mstaff) {
            res.status(404).json({message : 'Không tìm thấy email của nhân viên này !!!'});
            return;
        }

        console.log(bcrypt.compareSync(data.password , mstaff.password));
        if(!bcrypt.compareSync(data.password , mstaff.password)) {
            res.status(400).json({message : 'Mật khẩu bị sai vui lòng thử lại !!'});
            return;
        }   

        const allpermission : permission[] = await PermissionService.findByRoleID(mstaff.role_id);
        console.log(allpermission)

        if(!allpermission) {
            res.status(201).json({
                role_id : mstaff.role_id,
                fullname  : mstaff.name,
                name_action : []
            });
            return;
        }

        const allaction : string[] = await Promise.all( allpermission.map( async (row) => {
            const actionnew : action = await ActionService.find(row.action_id);
            return actionnew.name_action;
        }));

        const payload = {
            role_id : mstaff.role_id,
            fullname  : mstaff.name,
            name_action : allaction
        }
        
        const generate_access_token = jwt.sign(payload , process.env.KEY_ACCESS_TOKEN , { expiresIn : "120s" });
        const generate_refresh_token = jwt.sign(payload , process.env.KEY_REFRESH_TOKEN , { expiresIn : '15m' });


        res.status(201).json({
            refresh_token : generate_refresh_token,
            access_token : generate_access_token
        });
    }

    static logout = (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Không thể xóa session');
            }
        });
        // console.log(1)
        res.redirect('/admin/login.html');
        return;
    }

}

export default   AuthController