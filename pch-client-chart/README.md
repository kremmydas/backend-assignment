
## How to use

### 1. Build and push the `parser` and `ui` images

From the root folder of this repo, build the images:

`docker-compose build`

Push the images to a registry, e.g. docker-hub.
As an alternative, the minikube registry addon can be used.

`minikube addons enable registry`

In order to make docker accept pushing images to this registry, we have to redirect port 5000 on the docker virtual machine over to port 5000 on the minikube machine. We can (ab)use docker’s network configuration to instantiate a container on the docker’s host, and run socat there:

```
docker run --rm -it --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000"
```

```
docker tag my/image localhost:5000/myimage
docker push localhost:5000/myimage
```

Note that the image name for `frontend` and `parser` services in `values.yaml` must be edited accordingly.

### 2. Download and install minikube

We will use minikube to setup a local Kubernetes cluster on macOS.

```curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64 && chmod +x minikube```

`sudo mv minikube /usr/local/bin`

### 3. Start minikube

`minikube start --memory 4096 --cpus 4`

Enable Ingress controller:

`minikube addons enable ingress`

### 4. Install the pch-client chart

Install the helm chart from the local folder:

`helm install -f values.yaml pch-client .`

### 5. Using ingress resource

Ingress is enabled by default in `values.yaml` file. By default, the hostname defaults to `pchdemo.local`; to change it, you can provide a value in your yaml file when installing with helm for value `ingress.host`.

Edit `/etc/hosts` file to point to the minikube IP for the specified hostname:

`echo $(minikube ip) pchdemo.local | sudo tee -a /etc/hosts`

### 5. CI/CD using Github actions

Github actions jobs are defined in `.github/workflows/main.yml ` file.

- A pull request triggers the workflow only for the main branch.
- An [action](https://github.com/kremmydas/setup-minikube) is used to setup a minikube cluster.
- The helm chart is deployed on the cluster.
- Some checks are included to verify the deployment:
	- test the service URL with curl
	- check data in ixp_server_data table

### 6. Observability

Kubernetes dashboard can be used for basic monitoring and metrics.

Enable dashboard and metrics-server addons:

```
minikube addons enable dashboard
minikube addons enable metrics-server
```
To access the dashboard:

`minikube dashboard`
  
An alternative is the desktop app [Lens](https://docs.k8slens.dev/main/).
