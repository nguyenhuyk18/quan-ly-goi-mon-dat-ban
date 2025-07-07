import express, { Router } from 'express';

import ActionController from '../controllers/ActionController';
import RoleController from '../controllers/RoleController';
import BrandController from '../controllers/BrandController';
import CategoryController from '../controllers/CategoryController';

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




export default router;