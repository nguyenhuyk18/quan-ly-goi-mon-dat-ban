import express, { Router } from 'express';


// Import Controller
import ActionController from '../controllers/ActionController';
import RoleController from '../controllers/RoleController';
import BrandController from '../controllers/BrandController';
import CategoryController from '../controllers/CategoryController';
import CustomerController from '../controllers/CustomerController';
import StaffController from '../controllers/StaffController';
import WardController from '../controllers/WardController';
import DistrictController from '../controllers/DistrictController';
import ProvinceController from '../controllers/ProvinceController';
import ProductController from '../controllers/ProductController';
import CommentController from '../controllers/CommentController';


// Import Middlewares
import {UploadAvatarStaff , checkIDStaff}  from '../middlewares/UploadAvartar';
import { UploadImageProduct } from '../middlewares/UploadProduct';

// Set up router
const router : Router = express.Router();

// action
router.get('/api/v1/admin/action' , ActionController.index);
router.get('/api/v1/admin/action/:id' , ActionController.find);

// role
router.get('/api/v1/admin/role' , RoleController.index);
router.get('/api/v1/admin/role/:id' , RoleController.find);
router.post('/api/v1/admin/role' , RoleController.store);
router.put('/api/v1/admin/role' , RoleController.edit);
router.delete('/api/v1/admin/role/:id' , RoleController.delete);


// brand
router.get('/api/v1/admin/brand' , BrandController.index);
router.get('/api/v1/admin/brand/:id' , BrandController.find);
router.post('/api/v1/admin/brand' , BrandController.store);
router.put('/api/v1/admin/brand' , BrandController.update);
router.delete('/api/v1/admin/brand/:id' , BrandController.delete);

// category
router.get('/api/v1/admin/category' , CategoryController.index);
router.get('/api/v1/admin/category/:id' , CategoryController.find);
router.post('/api/v1/admin/category' , CategoryController.store);
router.put('/api/v1/admin/category' , CategoryController.update);
router.delete('/api/v1/admin/category/:id' , CategoryController.delete);


// customer
router.get('/api/v1/admin/customer' , CustomerController.index);
router.get('/api/v1/admin/customer/:id' , CustomerController.find);
router.post('/api/v1/admin/customer' ,CustomerController.store);
router.put('/api/v1/admin/customer' , CustomerController.update);
router.delete('/api/v1/admin/customer/:id' , CustomerController.delete);



// staff
router.get('/api/v1/admin/staff' , StaffController.index);
router.get('/api/v1/admin/staff/:id' , StaffController.find);
router.post('/api/v1/admin/staff' , StaffController.store);
router.put('/api/v1/admin/staff' , StaffController.update);
router.delete('/api/v1/admin/staff/:id' , StaffController.delete);
router.get('/api/v1/admin/avatar-staff/:id' , StaffController.getImageStaff);
router.post('/api/v1/admin/avatar-staff/:id' , checkIDStaff , UploadAvatarStaff.single('avatarstaff') , StaffController.uploadImageStaff);

// product 
router.get('/api/v1/admin/product' , ProductController.index);
router.get('/api/v1/admin/product/:id' ,ProductController.find);
router.post('/api/v1/admin/product' , UploadImageProduct.single('imageproduct') , ProductController.store);
router.put('/api/v1/admin/product' , UploadImageProduct.single('imageproduct') , ProductController.update);
router.delete('/api/v1/admin/product/:id'  , ProductController.delete);
router.get('/api/v1/admin/image-product/:id' , ProductController.returnImageProduct);

// comment
router.get('/api/v1/admin/comment' , CommentController.index);
router.get('/api/v1/admin/comment/:id' , CommentController.find);
router.post('/api/v1/admin/comment' , CommentController.save);
router.put('/api/v1/admin/comment' , CommentController.update);
router.delete('/api/v1/admin/comment/:id' , CommentController.delete);
router.get('/api/v1/admin/comment-product/:id_product' , CommentController.findByProductID); 

// ward 
router.get('/api/v1/admin/ward' , WardController.getAll);
router.get('/api/v1/admin/ward/:id' , WardController.find);
router.get('/api/v1/admin/ward-by-district/:id_district' , WardController.getByDistrictID);


// district
router.get('/api/v1/admin/district' , DistrictController.getAll);
router.get('/api/v1/admin/district/:id' , DistrictController.find);
router.get('/api/v1/admin/district-by-province/:id_province' , DistrictController.getByProvinceID);

// province 
router.get('/api/v1/admin/province' , ProvinceController.getAll);
router.get('/api/v1/admin/province/:id' , ProvinceController.find);


// floor 


export default router;