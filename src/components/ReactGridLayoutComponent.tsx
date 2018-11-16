import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import './react-grid-layout.css';

import * as _ from 'lodash';
import * as React from 'react';
// import { RouteComponentProps } from "react-router";
import * as RGL from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
const ReactGridLayout = WidthProvider(RGL);

interface IProps extends RGL.ReactGridLayoutProps {
    className: string;
    items: number;
    cols: number;
    rowHeight: number;
    verticalCompact: boolean;
    onLayoutChange: (layout: ILayout[]) => void;
}

interface IState {
    layout: ILayout[];
}

interface ILayout extends RGL.Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export class NoCompactingLayout extends React.PureComponent<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        items: 50,
        className: "layout",
        cols: 12,
        rowHeight: 30,
        verticalCompact: true,
    }

    constructor(props: IProps) {
        super(props);
        const layout = this.generateLayout();
        this.state = { layout };
        this.onLayoutChange = this.onLayoutChange.bind(this);
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

    public generateLayout(): ILayout[] {
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

    public onLayoutChange(layout: ILayout[]) {
        // this.props.onLayoutChange(layout);
        this.setState({ layout });
    }

    public render() {
        return (
            <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange} {...this.props}>
                {this.generateDOM()}
            </ReactGridLayout>
        )
    }
}

