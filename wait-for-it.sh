wait_for_it() {
    local host="$1"
    local port="$2"
    local max_tries=15
    local delay=2

    for i in $(seq 1 $max_tries); do
        nc -z "$host" "$port" > /dev/null 2>&1
        result=$?
        if [ $result -eq 0 ]; then
            echo "Connection is available after $i tries"
            return 0
        fi
        echo "Waiting for connection... $i/$max_tries"
        sleep $delay
    done
    echo "Max tries reached, exiting"
    return 1
}

wait_for_it postgres 5432
if [ $? -eq 0 ]; then
    echo "Postgres is ready!"
else
    echo "Failed to connect to Postgres"
fi