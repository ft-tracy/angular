import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moduleName'
})
export class ModuleNamePipe implements PipeTransform {

  transform(moduleId: string, modules: { moduleId: string, moduleName: string }[]): string {
    const module = modules.find(mod => mod.moduleId === moduleId);
    return module ? module.moduleName : moduleId; // Fallback to moduleId if moduleName is not found
  }

}

