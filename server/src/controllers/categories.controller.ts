import { NextFunction, Request, Response } from 'express';
import { CreateCategoryDto } from '@dtos/categories.dto';
import { Category } from '@/interfaces/interface';
import categoriesService from '@services/categories.service';

class CategoriesController {
  public categoriesService = new categoriesService();

  public getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCategoriesData: Category[] =
        await this.categoriesService.findAllCategory();

      res.status(200).json({ data: findAllCategoriesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: string = req.params.id;
      const findOneCategoryData: Category = await this.categoriesService.findCategoryById(
        categoryId,
      );

      res.status(200).json({ data: findOneCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryData: CreateCategoryDto = req.body;
      const createCategoryData: Category = await this.categoriesService.createCategory(
        categoryData,
      );

      res.status(201).json({ data: createCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: string = req.params.id;
      const categoryData: CreateCategoryDto = req.body;
      const updateCategoryData: Category = await this.categoriesService.updateCategory(
        categoryId,
        categoryData,
      );

      res.status(200).json({ data: updateCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: string = req.params.id;
      const deleteCategoryData: Category = await this.categoriesService.deleteCategory(
        categoryId,
      );

      res.status(200).json({ data: deleteCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;
