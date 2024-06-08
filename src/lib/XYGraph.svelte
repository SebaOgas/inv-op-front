<script lang="ts" context="module">
    export interface XYFunction {
        dots : {x: number, y: number}[];
        color: string
    }
</script>

<script lang="ts">
	import { onMount } from "svelte";


    export let functions : XYFunction[] = [];
    export let height : number = 900;
    export let width : number = 1600;
    export let yMarks : number = 5;
    export let precision : {x: number, y: number} = {x: 2, y:2};
    export let xLabels : string[] = [];

    let canvas : HTMLCanvasElement;

    let ctx : CanvasRenderingContext2D | null = null;

    function updateGraph(functions: XYFunction[], height: number, width: number, yMarks: number, precision: { x: number; y: number; }, xLabels: string[]) {
        if (ctx === null) return;
        ctx.clearRect(0, 0, width, height);

        let cvh = canvas.height;
        let cvw = canvas.width;

        let gh = cvh * 0.85;
        let gw = cvw * 0.86;
        let oy = cvh * 0.05;
        let ox = cvw * 0.1;

        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(ox, gh + oy);
        ctx.lineTo(cvw, gh + oy);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(ox, 0);
        ctx.lineTo(ox, gh + oy);
        ctx.stroke();
        ctx.closePath();

        ctx.lineWidth = 2;

        let minX = Math.min(...functions.map(f => Math.min(...f.dots.map(d => d.x))));
        let maxX = Math.max(...functions.map(f => Math.max(...f.dots.map(d => d.x))));
        let minY = Math.min(...functions.map(f => Math.min(...f.dots.map(d => d.y))));
        let maxY = Math.max(...functions.map(f => Math.max(...f.dots.map(d => d.y))));
        let rangeX = maxX - minX;
        let rangeY = maxY - minY;

        let xValues : number[] = [];
        functions.forEach(f => {
            let arr = f.dots.map(d => d.x);
            xValues = xValues.concat(arr);
        })
        xValues =[...new Set(xValues)];

        let fontSize = height/20;

        ctx.font = fontSize + "px Tahoma";
        ctx.textAlign = "right";

        for (let i = 0; i < yMarks; i++) {
            ctx.beginPath();
            ctx.moveTo(ox, oy + i/yMarks * gh);
            ctx.lineTo(ox - ox/10, oy + i/yMarks * gh);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillText("" + (minY + rangeY * (yMarks - i)/yMarks).toFixed(precision.y), ox - ox/8, oy + i/yMarks * gh + fontSize/3);
            ctx.closePath();
        }

        ctx.textAlign = "center";

        let labels : string[] = [];
        let fullLength : number = 0;
        for (let i = 0; i < xValues.length; i++) {
            let txt : string;
            if(xLabels[xValues[i]] !== undefined) {
                txt = xLabels[xValues[i]];
            } else {
                txt = "" + xValues[i].toFixed(precision.x);
            }
            fullLength += ctx.measureText(txt).width;
            labels[i] = txt;
        }
        let labelFactor : number = Math.ceil(fullLength / cvw * 1.25);

        for (let i = 0; i < xValues.length; i++) {
            if (i % labelFactor !== 0) continue;
            ctx.beginPath();
            ctx.moveTo(ox + i/(xValues.length-1) * gw, oy + gh);
            ctx.lineTo(ox + i/(xValues.length-1) * gw, oy + gh + oy/2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillText(labels[i], ox + i/(xValues.length-1) * gw, oy + gh + 2 * oy);
            ctx.closePath();
        }

        functions.forEach(f => {
            if (ctx === null) return;
            f.dots = f.dots.sort((a,b) => a.x - b.x);

            ctx.strokeStyle = f.color;
            ctx.beginPath();
            ctx.moveTo(((f.dots[0].x - minX)/rangeX)*gw + ox, gh - ((f.dots[0].y - minY)/rangeY)*gh + oy);
            f.dots.forEach(d => {
                if (ctx === null) return;
                let x = ((d.x - minX)/rangeX)*gw + ox;
                let y = gh - ((d.y - minY)/rangeY)*gh + oy;
                ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.closePath();
        })
    }

    onMount(() => {
        canvas.height = height;
        canvas.width = width;
        ctx = canvas.getContext("2d");
        updateGraph(functions, height, width, yMarks, precision, xLabels);
    });

    $: updateGraph(functions, height, width, yMarks, precision, xLabels);


</script>




<canvas bind:this={canvas}>

</canvas>


<style>
    canvas {
        width: 100%;
        height: 100%;
    }
</style>