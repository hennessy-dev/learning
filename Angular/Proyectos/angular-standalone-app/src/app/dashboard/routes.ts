import { Route, Routes } from "@angular/router"
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { TaskComponent } from "./task/task.component";

export default [
  { path: 'categories', component: CategoryComponent },
  { path: 'products', component: ProductComponent },
  { path: 'task', component: TaskComponent }
] as Route[];