/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

import { Component, HostListener} from '@ibyar/aurora';


@Component({
  selector: 'component-without-children',
  template: `
    <div>
      <ce-without-children id="wc"></ce-without-children>
    </div>
  `
})
export class ComponentWithoutChildren {
}

@Component({
  selector: 'component-with-children',
  template: `
    <div>
      <ce-with-children id="wc"></ce-with-children>
    </div>
  `
})
export class ComponentWithChildren {
}

@Component({
  selector: 'component-with-children-rerender',
  zone: 'proxy',
  template: `
    <div>
      <ce-with-children id="wc">{{count}}</ce-with-children>
    </div>
  `
})
export class ComponentWithChildrenRerender {
  count = 1;

  updateCount() {
    Promise.resolve().then(() => this.count++);
  }
}

@Component({
  selector: 'component-with-different-views',
  template: `
    <ce-with-children id="wc" *if="showWC; else elseBlock"></ce-with-children>
    <template #elseBlock><div id="dummy">Dummy view</div></template>
  `
})
export class ComponentWithDifferentViews {
  showWC = true;
  toggle() {
    this.showWC = !this.showWC;
  }
}

@Component({
  selector: 'component-with-properties',
  template: `
    <div>
      <ce-with-properties id="wc"
        [bool]="data.bool"
        [num]="data.num"
        [str]="data.str"
        [arr]="data.arr"
        [obj]="data.obj"
      ></ce-with-properties>
    </div>
  `
})
export class ComponentWithProperties {
  data = {
    bool: true,
    num: 42,
    str: 'Aurora',
    arr: ['A', 'u', 'r', 'o', 'r', 'a'],
    obj: { org: 'aurora', repo: 'aurora' }
  }
}

@Component({
  selector: 'component-with-unregistered',
  template: `
    <div>
      <ce-unregistered id="wc"
        [attr.bool]="data.bool"
        [attr.num]="data.num"
        [attr.str]="data.str"
        [arr]="data.arr"
        [obj]="data.obj"
      ></ce-unregistered>
    </div>
  `
})
export class ComponentWithUnregistered {
  data = {
    bool: true,
    num: 42,
    str: 'Aurora',
    arr: ['A', 'u', 'r', 'o', 'r', 'a'],
    obj: { org: 'aurora', repo: 'aurora' }
  }
}

@Component({
  selector: 'component-with-imperative-event',
  template: `
    <div>
      <div id="handled">{{eventHandled}}</div>
      <ce-with-event #customEl id="wc"></ce-with-event>
    </div>
  `
})
export class ComponentWithImperativeEvent {
  eventHandled = false;
  @HostListener('customEl:camelEvent')
  handleTestEvent() {    
    this.eventHandled = true;
  }
}

@Component({
  selector: 'component-with-declarative-event',
  template: `
    <div>
      <div id="lowercase">{{lowercaseHandled}}</div>
      <div id="kebab">{{kebabHandled}}</div>
      <div id="camel">{{camelHandled}}</div>
      <div id="caps">{{capsHandled}}</div>
      <div id="pascal">{{pascalHandled}}</div>
      <ce-with-event id="wc"
        (lowercaseevent)="handleLowercaseEvent()"
        (kebab-event)="handleKebabEvent()"
        (camelEvent)="handleCamelEvent()"
        (CAPSevent)="handleCapsEvent()"
        (PascalEvent)="handlePascalEvent()"
      ></ce-with-event>
    </div>
  `
})
export class ComponentWithDeclarativeEvent {
  lowercaseHandled = false;
  kebabHandled = false;
  camelHandled = false;
  capsHandled = false;
  pascalHandled = false;
  handleLowercaseEvent() {
    this.lowercaseHandled = true;
  }
  handleKebabEvent() {
    this.kebabHandled = true;
  }
  handleCamelEvent() {
    this.camelHandled = true;
  }
  handleCapsEvent() {
    this.capsHandled = true;
  }
  handlePascalEvent() {
    this.pascalHandled = true;
  }
}
