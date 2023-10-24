import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MapComponent } from "./components/map/map.component";
import { FormComponent } from "./components/form/form.component";

const routes: Routes = [
  { path: "map", component: MapComponent },
  { path: "form", component: FormComponent },
  { path: "", redirectTo: "form", pathMatch: "full" },
];

// { path: 'station/:station', component: StationComponent},

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
