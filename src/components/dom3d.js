// Copyright 2016 Todd Fleming
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Includes code from CSS3DRenderer.js:
//      Author mrdoob / http://mrdoob.com/
//      Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs

import { mat4 } from 'gl-matrix';
import React from 'react'
import ReactDOM from 'react-dom';

function epsilon(value) {
    return Math.abs(value) < Number.EPSILON ? 0 : value;
};

function getCameraCSSMatrix(clientWidth, clientHeight, matrix) {
    return 'matrix3d(' +
        epsilon(matrix[0] * clientWidth / 2) + ',' +
        epsilon(- matrix[1] * clientHeight / 2) + ',' +
        epsilon(matrix[2]) + ',' +
        epsilon(matrix[3]) + ',' +

        epsilon(matrix[4] * clientWidth / 2) + ',' +
        epsilon(-matrix[5] * clientHeight / 2) + ',' +
        epsilon(matrix[6]) + ',' +
        epsilon(matrix[7]) + ',' +

        epsilon(matrix[8] * clientWidth / 2) + ',' +
        epsilon(-matrix[9] * clientHeight / 2) + ',' +
        epsilon(matrix[10]) + ',' +
        epsilon(matrix[11]) + ',' +

        epsilon(matrix[12] * clientWidth / 2) + ',' +
        epsilon(- matrix[13] * clientHeight / 2) + ',' +
        epsilon(matrix[14]) + ',' +
        epsilon(matrix[15]) +
        ')';
};

export class Dom3d extends React.Component {
    componentWillUpdate() {
        if (!this.props.camera)
            return;
        let camera = this.props.camera;
        let node = ReactDOM.findDOMNode(this);
        this.width = node.clientWidth;
        this.height = node.clientHeight;
        this.fov = 0;
        this.transform = "translate3d(0,0," + this.fov + "px)" + getCameraCSSMatrix(node.clientWidth, node.clientHeight, camera.world) +
            " translate3d(" + node.clientWidth / 2 + "px," + node.clientHeight / 2 + "px, 0)";
    }

    render() {
        return (
            <div className={this.props.className} style={{
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                perspective: this.fov
            }}>
                <div style={{
                    position: 'absolute',
                    width: this.width,
                    height: this.height,
                    transformStyle: 'preserve-3d',
                    transform: this.transform,
                }}>
                    {this.props.children}
                </div>
            </div >
        );
    }
}

export function Text3d(props) {
    return (
        <div style={{
            position: 'absolute',
            transform: 'translate3d(' + props.x + 'px,' + props.y + 'px,0) translate3d(-50%,-50%,0) scale(.1,-.1)',
        }}>
            <div style={Object.assign({}, props.style, {
                left: 0,
                top: 0,
                fontSize: props.size * 10,
            })}>
                {props.children}
            </div>
        </div >
    );
}
