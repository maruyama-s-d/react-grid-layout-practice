import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import './react-grid-layout.css';

import * as _ from 'lodash';
import * as React from 'react';
// import { RouteComponentProps } from "react-router";
import * as RGL from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
const ReactGridLayout = WidthProvider(RGL);

interface IRGLLayout extends RGL.Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    maxW?: number;
    static?: boolean;
}

interface IRGLState {
    layout: IRGLLayout[];
}

// export class ReactGridLayoutComponent extends React.Component<{}, IReactGridLayoutState> {
//     constructor() {
//         super({});

//         const layoutItems: IReactGridLayoutItem[] = [
//             { i: 'a', x: 0, y: 0, w: 1, h: 2, static: false },
//             { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
//             { i: 'c', x: 4, y: 0, w: 1, h: 2 }
//         ];

//         this.state = { layout: layoutItems, loading: true };
//     }

//     public render() {
//         return <div>
//             <ReactGridLayout className="layout" layout={this.state.layout} cols={12} rowHeight={30} width={1200}>
//                 <div key="a">a</div>
//                 <div key="b">b</div>
//                 <div key="c">c</div>
//             </ReactGridLayout>
//         </div>;
//     }
// }


interface IGRLProps{
    claccName: string,
    items: number,
    cols: number,
    rowHeight: number,
    verticalCompact: boolean,
}

export class NoCompactingLayout extends React.PureComponent<IGRLProps, IRGLState> {
    public static defaultProps: Partial<IGRLProps> = {
        claccName: "layout",
        items: 50,
        cols: 12,
        rowHeight: 30,
        verticalCompact: false,
    }

    constructor(props: IGRLProps) {
        super(props);
        const layout = this.generateLayout();
        this.state = { layout };
    }

    public generateDOM() {
        return _.map(_.range(this.props.items), (i: string) => {
            return (
                <div key={i}>
                    <span className="text">{i}</span>
                </div>
            );
        });
    }

    public generateLayout(): IRGLLayout[] {
        const p = this.props;
        return _.map(new Array(p.items), (item, i) => {
            const y = _.result(p, "y", Math.ceil(Math.random() * 4) + 1);
            return {
                i: i.toString(),
                x: (i * 2) % 12,
                y: Math.floor(i / 6) * y,
                w: 2,
                h: y,
            };
        });
    }

    public render() {
        return (
            <ReactGridLayout layout={this.state.layout} {...this.props}>
                {this.generateDOM()}
            </ReactGridLayout>
        )
    }
}

