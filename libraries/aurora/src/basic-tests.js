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

 import { expect } from "chai";
 import "./components";
 

describe("basic support", function() {

  describe("no children", function() {
    it("can display a Custom Element with no children", function() {
      this.weight = 3;
      let el = document.createElement('component-without-children');
      document.body.append(el);
      let wc = el.querySelector("ce-without-children");
      expect(wc).to.exist;
      el.remove();
    });
  });

  describe("with children", function() {
    function expectHasChildren(wc) {
      expect(wc).to.exist;
      let shadowRoot = wc.shadowRoot;
      let heading = shadowRoot.querySelector("h1");
      expect(heading).to.exist;
      expect(heading.textContent).to.eql("Test h1");
      let paragraph = shadowRoot.querySelector("p");
      expect(paragraph).to.exist;
      expect(paragraph.textContent).to.eql("Test p");
    }

    it("can display a Custom Element with children in a Shadow Root", function() {
      this.weight = 3;
      let el = document.createElement('component-with-children');
      document.body.append(el);
      let wc = el.querySelector("#wc");
      expectHasChildren(wc);
      el.remove();
    });

    it("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", function(
      done
    ) {
      this.weight = 3;
      let el = document.createElement('component-with-children-rerender');
      document.body.append(el);
      let wc = el.querySelector("#wc");
      expectHasChildren(wc);
      setTimeout(() => {
        expect(wc.textContent.includes("2")).to.be.true;
        el.remove();
        done();
      }, 1000);
    });

    it("can display a Custom Element with children in a Shadow Root and handle hiding and showing the element", function() {
      this.weight = 3;
      let root = document.createElement('component-with-different-views');
      document.body.append(root);
      let component = root._model;
      let wc = root.querySelector("#wc");
      expectHasChildren(wc);
      component.toggle();
      root._modelScope.detectChanges();
      let dummy = root.querySelector("#dummy");
      expect(dummy).to.exist;
      expect(dummy.textContent).to.eql("Dummy view");
      component.toggle();
      root._modelScope.detectChanges();
      wc = root.querySelector("#wc");
      expectHasChildren(wc);
      root.remove();
    });
  });

  describe("attributes and properties", function() {
    it("will pass boolean data as either an attribute or a property", function() {
      this.weight = 3;
      let root = document.createElement('component-with-properties');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let data = wc.bool || wc.hasAttribute("bool");
      expect(data).to.be.true;
      root.remove();
    });

    it("will pass numeric data as either an attribute or a property", function() {
      this.weight = 3;
      let root = document.createElement('component-with-properties');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let data = wc.num || wc.getAttribute("num");
      expect(parseInt(data, 10)).to.eql(42);
      root.remove();
    });

    it("will pass string data as either an attribute or a property", function() {
      this.weight = 3;
      let root = document.createElement('component-with-properties');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let data = wc.str || wc.getAttribute("str");
      expect(data).to.eql("Aurora");
      root.remove();
    });
  });

  describe("events", function() {
    it("can imperatively listen to a DOM event dispatched by a Custom Element", function() {
      this.weight = 3;
      let root = document.createElement('component-with-imperative-event');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#handled");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
      root.remove();
    });
  });

});