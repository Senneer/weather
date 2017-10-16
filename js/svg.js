document.addEventListener('DOMContentLoaded', () => {
  var SvgRender = function() {
    this.svgPaths = {
      'search': {
        path: 'M447.05 428l-109.6-109.6c29.4-33.8 47.2-77.9 47.2-126.1C384.65 86.2 298.35 0 192.35 0 86.25 0 .05 86.3.05 192.3s86.3 192.3 192.3 192.3c48.2 0 92.3-17.8 126.1-47.2L428.05 447c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.2-5.2 5.2-13.8 0-19zM26.95 192.3c0-91.2 74.2-165.3 165.3-165.3 91.2 0 165.3 74.2 165.3 165.3s-74.1 165.4-165.3 165.4c-91.1 0-165.3-74.2-165.3-165.4z',
        viewBox: '0 0 451 451'
      },
      'sun': {
        path: 'M26 12.994c-7.18 0-13 5.819-13 12.999 0 7.181 5.82 13.002 13 13.002s13-5.821 13-13.002c0-7.18-5.82-12.999-13-12.999zm0 24.001c-6.065 0-11-4.936-11-11.002 0-6.064 4.935-10.999 11-10.999s11 4.935 11 10.999c0 6.067-4.935 11.002-11 11.002zM24.993 0h2v10h-2zM24.993 42h2v10h-2zM0 25h9.993v2H0zM41.993 25H52v2H41.993zM43.6658097 6.9030309l1.4142 1.4142-7.3602039 7.3602039-1.4142-1.4142zM8.3109981 45.0875691l-1.4142-1.4142 7.360911-7.360911 1.4142 1.4142zM8.3150948 6.908398l7.3602039 7.3602039-1.4142 1.4142L6.9008948 8.322598zM43.6713631 45.0886308l-7.361952-7.360911 1.4142-1.4144 7.361952 7.360911z',
        viewBox: '0 0 52 52'
      },
      'logo-icon': {
        path: 'M38.415,26.157 L28.434,26.157 L26.091,29.870 L23.747,26.157 L1.585,26.157 C0.710,26.157 -0.000,25.451 -0.000,24.580 L-0.000,1.577 C-0.000,0.706 0.710,0.000 1.585,0.000 L38.415,0.000 C39.290,0.000 40.000,0.706 40.000,1.577 L40.000,24.580 C40.000,25.451 39.290,26.157 38.415,26.157 ZM27.581,5.035 L21.247,5.035 L21.247,21.121 L14.235,5.035 L11.011,5.035 L4.146,21.121 L7.222,21.121 L12.550,8.106 L15.095,14.147 L11.837,14.147 L10.808,16.734 L16.180,16.734 L18.024,21.121 L21.247,21.121 L27.581,21.121 C32.935,21.121 35.612,18.294 35.612,12.640 C35.612,7.571 32.935,5.035 27.581,5.035 ZM27.581,18.534 L24.245,18.534 L24.245,7.623 L27.581,7.623 C30.937,7.623 32.615,9.295 32.615,12.640 C32.615,16.569 30.937,18.534 27.581,18.534 ZM7.148,28.560 C7.863,28.866 8.487,29.283 9.018,29.812 C9.550,30.340 9.969,30.961 10.277,31.672 C10.584,32.384 10.738,33.141 10.738,33.942 C10.738,34.743 10.584,35.499 10.277,36.211 C9.969,36.923 9.550,37.544 9.018,38.072 C8.487,38.600 7.863,39.017 7.148,39.323 C6.432,39.629 5.671,39.782 4.866,39.782 L2.785,39.782 L3.607,37.780 L4.866,37.780 C5.380,37.780 5.872,37.683 6.342,37.488 C6.812,37.293 7.231,37.018 7.601,36.662 C7.958,36.295 8.235,35.880 8.431,35.418 C8.627,34.957 8.725,34.465 8.725,33.942 C8.725,33.430 8.627,32.940 8.431,32.473 C8.235,32.006 7.958,31.589 7.601,31.222 C7.231,30.866 6.812,30.590 6.342,30.396 C5.872,30.201 5.380,30.104 4.866,30.104 L2.013,30.104 L2.013,34.943 L2.013,37.780 L2.013,39.782 L-0.000,39.782 L-0.000,28.101 L4.866,28.101 C5.671,28.101 6.432,28.254 7.148,28.560 ZM17.836,28.101 L23.138,39.782 L20.923,39.782 L20.017,37.780 L19.111,35.777 L16.728,30.538 L14.346,35.777 L17.399,35.777 L18.306,37.780 L13.440,37.780 L12.534,39.782 L10.319,39.782 L15.621,28.101 L17.836,28.101 ZM22.752,28.101 L26.091,33.391 L29.430,28.101 L31.812,28.101 L27.282,35.277 L27.097,35.561 L27.097,35.828 L27.097,39.782 L25.084,39.782 L25.084,35.561 L20.369,28.101 L22.752,28.101 ZM37.030,35.510 C36.829,35.399 36.616,35.310 36.392,35.243 C36.169,35.177 35.967,35.116 35.788,35.060 C35.732,35.038 35.682,35.024 35.638,35.018 C35.593,35.012 35.554,34.999 35.520,34.977 C35.498,34.977 35.464,34.965 35.420,34.943 C35.185,34.876 34.846,34.759 34.404,34.593 C33.962,34.426 33.523,34.198 33.087,33.908 C32.069,33.230 31.560,32.396 31.560,31.405 C31.560,30.749 31.675,30.195 31.904,29.745 C32.133,29.294 32.433,28.927 32.802,28.643 C33.171,28.360 33.582,28.157 34.035,28.035 C34.488,27.912 34.933,27.851 35.369,27.851 C36.175,27.851 36.851,27.945 37.399,28.134 C37.947,28.324 38.384,28.513 38.708,28.702 C38.876,28.802 39.019,28.900 39.136,28.994 C39.253,29.089 39.357,29.175 39.446,29.253 L38.020,30.688 C37.718,30.387 37.410,30.159 37.097,30.003 C36.627,29.781 36.135,29.670 35.621,29.670 C35.397,29.670 35.173,29.698 34.949,29.753 C34.726,29.809 34.530,29.881 34.362,29.970 C33.870,30.270 33.624,30.666 33.624,31.155 C33.624,31.455 33.725,31.711 33.926,31.923 C34.071,32.089 34.273,32.240 34.530,32.373 C34.742,32.484 34.966,32.573 35.201,32.640 C35.436,32.707 35.654,32.768 35.856,32.824 L36.057,32.874 C36.113,32.896 36.219,32.930 36.376,32.974 C36.532,33.018 36.717,33.085 36.929,33.174 C37.142,33.263 37.374,33.369 37.626,33.491 C37.878,33.614 38.126,33.758 38.372,33.925 C39.457,34.637 40.000,35.477 40.000,36.445 C40.000,36.990 39.910,37.482 39.732,37.921 C39.552,38.361 39.298,38.734 38.968,39.040 C38.638,39.346 38.238,39.582 37.768,39.749 C37.299,39.916 36.773,39.999 36.191,39.999 C35.263,39.999 34.435,39.852 33.708,39.557 C32.981,39.262 32.382,38.926 31.913,38.547 L33.305,37.162 C33.674,37.496 34.088,37.752 34.547,37.930 C34.826,38.041 35.089,38.114 35.336,38.147 C35.581,38.180 35.783,38.197 35.939,38.197 C36.230,38.197 36.496,38.161 36.737,38.089 C36.977,38.016 37.187,37.919 37.366,37.796 C37.746,37.518 37.936,37.152 37.936,36.695 C37.936,36.417 37.835,36.167 37.634,35.944 C37.477,35.766 37.276,35.622 37.030,35.510 Z',
        viewBox: '0 0 40 40',
        gradient: {
          start: '#0838a1',
          stop: '#af2d36'
        }
      }
    };
  };

  SvgRender.prototype.render = function(selector, svgName) {
    var svg = document.createElement('svg');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svg.setAttribute('viewBox', this.svgPaths[svgName].viewBox ? this.svgPaths[svgName].viewBox : '0 0 74 74');

    var path = document.createElement('path');
    path.setAttribute('d', this.svgPaths[svgName].path);

    if (this.svgPaths[svgName].gradient) {
      this.createGradient(svg, 'MyGradient', [
        {offset: '0%', 'stop-color': this.svgPaths[svgName].gradient.start},
        {offset: '100%', 'stop-color': this.svgPaths[svgName].gradient.stop}
        ]);

      path.setAttribute('fill', 'url(#MyGradient)');
    }

    svg.appendChild(path);

    selector.innerHTML = svg.outerHTML;
  };

  SvgRender.prototype.createGradient = function (svg, id, stops) {
    var svgNS = svg.namespaceURI;
    var grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', id);
    for (var i = 0; i < stops.length; i++) {
      var attrs = stops[i];
      var stop = document.createElementNS(svgNS, 'stop');
      for (var attr in attrs) {
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
      }
      grad.appendChild(stop);
    }

    var defs = svg.querySelector('defs') ||
    svg.insertBefore(document.createElementNS(svgNS, 'defs'), svg.firstChild);
    return defs.appendChild(grad);
  };

  var s = new SvgRender();

  document.querySelectorAll('[data-svg]').forEach((el) => {
    s.render(el, el.getAttribute('data-svg'));
  });
});