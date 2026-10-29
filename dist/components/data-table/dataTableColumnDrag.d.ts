import { KeyboardSensor, PointerSensor } from '@dnd-kit/react';
import { PluginDescriptor, Plugin } from '@dnd-kit/abstract';
import { PointerSensorOptions } from '@dnd-kit/dom';
/** Move by a whole column rather than the default sensor's fixed pixel step. */
declare class DataTableColumnKeyboardSensor extends KeyboardSensor {
    private choosingTarget;
    constructor(manager: ConstructorParameters<typeof KeyboardSensor>[0]);
    protected handleMove(direction: "up" | "down" | "left" | "right", event: KeyboardEvent): void;
    protected cleanup(): void;
}
export declare const dataTableColumnSensors: ( PluginDescriptor<any, Plugin<any, PointerSensorOptions>, typeof PointerSensor> | typeof DataTableColumnKeyboardSensor)[];
export {};
//# sourceMappingURL=dataTableColumnDrag.d.ts.map