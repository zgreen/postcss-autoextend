# PostCSS Autoextend

Use `@autoextend` to automatically extend styles.

```css
/* Input example */
.first-test {
  @autoextend {
    float: left;
    width: 50%;
    margin-right: 20px;
  }
}

.first-test-again {
  @autoextend {
    float: left;
    width: 50%;
    margin-right: 20px;
  }
}

.second-test {
  @autoextend {
    color: red;
    font-size: 1em;
  }
}

.second-test-again {
  @autoextend {
    color: red;
    font-size: 1em;
  }
}

.mixed-test {
  @autoextend {
    float: left;
    width: 50%;
    margin-right: 20px;
  }
  @autoextend {
    color: red;
    font-size: 1em;
  }
}
```
```css
/* Output example */
.second-test, .second-test-again, .mixed-test {
  color: red;
  font-size: 1em;
}

.first-test, .first-test-again, .mixed-test {
  float: left;
  margin-right: 20px;
  width: 50%;
}
```
